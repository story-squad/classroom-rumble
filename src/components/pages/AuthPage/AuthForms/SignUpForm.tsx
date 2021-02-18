import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from '../../../../api';
import { ISignUpBody } from '../../../../api/Auth';
import { patterns } from '../../../../config';
import { Checkbox, Input } from '../../../common';

const SignUpForm = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (arg: boolean) => void;
}): React.ReactElement => {
  const { errors, register, handleSubmit, clearErrors, watch } = useForm({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignUpBody> = async (data): Promise<void> => {
    try {
      Auth.login(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        name="username"
        register={register}
        id="signup-username"
        errors={errors}
        placeholder="Username"
        rules={{
          required: 'Username is required!',
          validate: {
            regex: (value) =>
              patterns.codenameRegex.test(value) || 'Must be X length',
          },
        }}
      />
      <Input
        label="signupEmail"
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
          },
        }}
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
          <>
            I have read and agree to the&nbsp;
            <Link to="/tos" className="text-button" target="_blank">
              Terms & Conditions
            </Link>
            .
          </>
        }
        errors={errors}
        register={register}
        rules={{ required: 'You must agree to the terms!' }}
      />
      <input
        className="submit"
        type="submit"
        value="Create Account"
        onClick={() => clearErrors()}
        // onClick={() => setIsLogin(!isLogin)}
        //Once Register is successful redirect to login page
      />
    </form>
  );
};

export default SignUpForm;
