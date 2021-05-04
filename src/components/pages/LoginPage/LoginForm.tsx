import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Auth } from '../../../api';
import { auth } from '../../../state';
import { Input } from '../../common';
import { ILoginParams } from './loginTypes';

const LoginForm = ({
  isMerge,
  codename,
  cleverId,
}: ILoginParams): React.ReactElement => {
  const { errors, register, handleSubmit, clearErrors, setError } = useForm();
  const login = useSetRecoilState(auth.isLoggedIn);
  const { push } = useHistory();

  const onSubmit: SubmitHandler<Auth.ILoginBody> = async (
    data,
  ): Promise<void> => {
    try {
      let res: Auth.IAuthResponse;
      if (isMerge) {
        res = await Auth.mergeAccounts(data, cleverId as string);
      } else {
        res = await Auth.login(data);
      }
      login(res);
      clearErrors();
      push(`/dashboard/${Auth.Roles[res.user.roleId]}`);
    } catch (err) {
      console.log({ err });
      let message: string;
      if (err.response?.data) {
        message = err.response.data.message;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }

      if (message === 'User not found') {
        setError('codename', { type: 'validate', message });
      } else {
        setError('form', { type: 'manual', message });
      }

      if (message === 'Invalid password') {
        setError('password', { type: 'validate', message });
      } else {
        setError('form', { type: 'manual', message });
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Codename"
        name="codename"
        register={register}
        id="login-codename"
        errors={errors}
        placeholder="Enter your codename"
        rules={{
          required: 'Codename is required!',
        }}
        defaultValue={codename}
      />

      <Input
        label="Password"
        name="password"
        register={register}
        id="login-password"
        errors={errors}
        type="password"
        placeholder="Enter your password"
        rules={{ required: 'Password is required!' }}
      />
      <input
        className="submit"
        type="submit"
        value={isMerge ? 'Merge' : 'Log In'}
        onClick={() => clearErrors('form')}
      />
    </form>
  );
};

export default LoginForm;
