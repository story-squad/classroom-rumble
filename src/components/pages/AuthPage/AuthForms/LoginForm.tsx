import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../api';
import { ILoginBody } from '../../../../api/Auth/basicAuth';
import { patterns } from '../../../../config';
import { token } from '../../../../utils';
import { Input } from '../../../common';

const LoginForm = (): React.ReactElement => {
  const { errors, register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<ILoginBody> = async (data): Promise<void> => {
    try {
      const res = await Auth.login(data);
      token.set(res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        name="email"
        register={register}
        id="login-email"
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
        label="Password"
        name="password"
        register={register}
        id="login-password"
        errors={errors}
        type="password"
        placeholder="Enter your password"
        rules={{ required: 'Password is required!' }}
      />
      <input className="submit" type="submit" value="Log In" />
    </form>
  );
};

export default LoginForm;
