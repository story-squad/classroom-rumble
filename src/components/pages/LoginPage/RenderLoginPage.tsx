import React from 'react';
import { Link } from 'react-router-dom';
import cleverLogo from '../../../assets/img/clever-square-icon.png';
import LoginForm from './LoginForm';
import { ILoginParams } from './loginTypes';

const RenderLoginPage = ({
  ...loginProps
}: ILoginParams): React.ReactElement => {
  return (
    <div className="login-page auth-page">
      <h1>Classroom Rumble</h1>
      {loginProps.isMerge ? (
        <p>Log in to link your Clever and Story Squad accounts</p>
      ) : (
        <>
          <button className="clever-signup">
            <img src={cleverLogo} alt="Clever Company Logo" />
            <p>Log in using Clever</p>
          </button>
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
