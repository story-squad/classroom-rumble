import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { Roles } from '../../../api/Auth';
import { patterns } from '../../../config';
import { auth } from '../../../state';
import getAge from '../../../utils/age/getAge';
import { Button, Checkbox, Input } from '../../common';
import { ISigninProps } from './signupTypes';

const SignupForm = ({
  isNew,
  roleId,
  cleverId,
  email,
  firstname,
  lastname,
}: ISigninProps): React.ReactElement => {
  const {
    errors,
    register,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState,
  } = useForm({
    mode: 'onChange',
  });
  const setUser = useSetRecoilState(auth.user);
  const setToken = useSetRecoilState(auth.authToken);
  const { push } = useHistory();
  const [nextForm, setNextForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Auth.SignupFormState>>({});

  const togglePage = (): void => {
    const currentFormData = watch();
    setFormData((prev) => ({ ...prev, ...currentFormData }));
    setNextForm((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Auth.SignupFormState> = async (
    data,
  ): Promise<void> => {
    const currentData = { ...formData, ...data };
    try {
      const credentials = Auth.formatSignupBody(currentData);
      let res: Auth.IAuthResponse;
      if (isNew) {
        res = await Auth.signupWithClever(
          credentials,
          roleId as number,
          cleverId as string,
        );
      } else {
        res = await Auth.signup(credentials);
      }
      setUser(res.user);
      setToken(res.token);
      clearErrors();

      const userType =
        res.user.roleId === Roles.user ? 'student' : Roles[res.user.roleId];
      push(`/dashboard/${userType}`);
    } catch (err) {
      console.log({ err });
      let message: string;
      if (err.response?.data) {
        message = err.response.data.error;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }
      setError('form', { type: 'manual', message });
    }
  };
  // console.log(formData.dob);
  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      {!nextForm && (
        <>
          <Input
            id="firstname"
            name="firstname"
            label="First Name"
            errors={errors}
            register={register}
            rules={{
              required: 'First name is required!',
            }}
            placeholder="Your first name"
            defaultValue={formData.firstname ?? firstname}
          />
          <Input
            id="lastname"
            name="lastname"
            label="Last Name"
            errors={errors}
            register={register}
            rules={{
              required: 'Last name is required!',
            }}
            placeholder="Your last name"
            defaultValue={formData.lastname ?? lastname}
          />
          <Input
            id="codename"
            name="codename"
            label="Codename"
            errors={errors}
            register={register}
            rules={{
              required: 'Codename is required!',
              validate: {
                checkCharacters: (value) => {
                  return (
                    // ensures the user's entered codename contains only allowed characters
                    patterns.codenameRegex.test(value) ||
                    'Only letters and numbers are allowed.'
                  );
                },
                checkLength: (value) => {
                  return (
                    value.length < 15 || 'Cannot be more than 15 characters.'
                  );
                },
              },
            }}
            defaultValue={formData.codename}
            placeholder="Your secret codename!"
          />
          <Input
            id="dob"
            name="dob"
            label="Date Of Birth"
            errors={errors}
            register={register}
            rules={{
              required: 'Date of birth is required!',
              validate: (value) => !!parseInt(value) || 'Format as MM/DD/YYYY!',
            }}
            placeholder="MM/DD/YYYY"
            defaultValue={formData.dob}
          />
          <input
            disabled={!formState.isValid}
            className="submit"
            type="button"
            value="Next"
            onClick={togglePage}
          />
        </>
      )}

      {nextForm && (
        <>
          {/* If the user is younger than 13, require a parent email */}
          {formData?.dob &&
            parseInt(getAge(formData.dob).toString() ?? '') < 13 && (
              <Input
                id="parentEmail"
                name="parentEmail"
                label="Parent Email"
                errors={errors}
                register={register}
                rules={{
                  validate: {
                    // required field if the entered age is less than 13
                    required: (value) => {
                      if (parseInt(watch('dob')) < 13)
                        return value.length > 1 || 'Parent email is required!';
                      else return true;
                    },
                    // checks the email and parent email to make sure they are different
                    differentEmail: (value) => {
                      return (
                        value !== watch('email') ||
                        'Parent email must be different than email!'
                      );
                    },
                  },
                  pattern: {
                    // ensures the entered parent email string matches a valid email address pattern
                    value: patterns.emailRegex,
                    message: 'Please enter a valid email address.',
                  },
                }}
                defaultValue={formData.parentEmail}
                placeholder="ParentSuperWriter@storysquad.org"
              />
            )}

          <Input
            label="Email"
            name="email"
            register={register}
            id="signup-email"
            errors={errors}
            placeholder="Enter your email"
            rules={{
              required: 'Email is required!',
              validate: {
                regex: (value) =>
                  patterns.emailRegex.test(value) || 'Must be a valid email',
              },
            }}
            defaultValue={formData.email ?? email}
          />
          <Input
            id="signupPassword"
            name="password"
            label="Password"
            type="password"
            showPassword
            errors={errors}
            register={register}
            rules={{
              required: 'Password is required!',
              validate: {
                // checks entered password value contains required characters
                // Password needs special characters added
                includesCapital: (value) => {
                  const pattern = /[A-Z]/;
                  return (
                    pattern.test(value) ||
                    'Password must include at least 1 capital letter.'
                  );
                },
                includesNumber: (value) => {
                  const pattern = /[0-9]/;
                  return (
                    pattern.test(value) ||
                    'Password must include at least 1 number.'
                  );
                },
                // checks that entered password value is a minimum of 8 chars
                checkLength: (value) => {
                  return (
                    (value.length >= 8 && value.length <= 32) ||
                    'Password must be between 8 and 32 characters.'
                  );
                },
                checkRegex: (value) => {
                  return (
                    patterns.passwordRegex.test(value) || 'Password is invalid!'
                  );
                },
              },
            }}
            defaultValue={formData.password}
            placeholder="Create a safe password"
          />
          <Input
            id="signupConfirm"
            name="confirm"
            label="Confirm Password"
            type="password"
            showPassword
            errors={errors}
            register={register}
            rules={{
              required: 'Password confirmation is required!',
              validate: (value) => {
                // checks that the values in password and confirm inputs match
                return value === watch('password') || "Passwords don't match!";
              },
            }}
            placeholder="Re-enter your password"
          />
          <Checkbox
            id="termsCheckbox"
            name="termsCheckbox"
            label={
              <p className="small">
                I have read and agree to the{' '}
                <Link to="/termsofservice" className="text-button">
                  Terms & Conditions
                </Link>
                .
              </p>
            }
            errors={errors}
            register={register}
            rules={{
              validate: {
                isChecked: (value) =>
                  value || 'You must accept terms and conditions!',
              },
            }}
          />
          <input
            className="submit"
            type="submit"
            value="Create Account"
            onClick={() => clearErrors('form')}
          />
          <Button htmlType="button" type="secondary" onClick={togglePage}>
            Back
          </Button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
