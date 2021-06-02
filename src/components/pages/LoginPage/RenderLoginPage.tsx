import React from 'react';
import { Link } from 'react-router-dom';
import { CleverButton } from '../../common';
import LoginForm from './LoginForm';
import { ILoginParams } from './loginTypes';

const RenderLoginPage = ({
  ...loginProps
}: ILoginParams): React.ReactElement => {
  return (
    <div className="login-page auth-page">
      <h1>Classroom Rumble</h1>
      {loginProps.isMerge ? (
        <>
          <p>It looks like you already have a Story Squad account!</p>
          <p>
            Enter your password below to automatically link your Clever and
            Story Squad accounts.
          </p>
        </>
      ) : (
        <>
          <CleverButton />
          <p className="small">OR</p>
          <p>Log in using email address</p>
        </>
      )}
      <LoginForm {...loginProps} />
      <p className="small">
        Don&apos;t have an account yet? <Link to="/signup">Sign Up Here</Link>
      </p>
    </div>
  );
};

export default RenderLoginPage;
