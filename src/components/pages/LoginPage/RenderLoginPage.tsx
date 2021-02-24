import React from 'react';
import LoginForm from './LoginForm';
import { ILoginParams } from './loginTypes';

const RenderLoginPage = ({
  ...loginProps
}: ILoginParams): React.ReactElement => {
  return (
    <div className="login-page">
      <h1>Log In</h1>
      {loginProps.isMerge ? (
        <p>
          After a successful login, your accounts will be merged and you will be
          taken to your dashboard.
        </p>
      ) : (
        <p>Some Login Stuff</p>
      )}
      <LoginForm {...loginProps} />
    </div>
  );
};

export default RenderLoginPage;
