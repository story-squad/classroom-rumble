import React from 'react';
import { Link } from 'react-router-dom';
import { CleverButton } from '../../common';
import SignupForm from './SignupForm';
import { ISigninProps } from './signupTypes';

const RenderSignupPage = (props: ISigninProps): React.ReactElement => {
  return (
    <div className="signup-page auth-page">
      <h1>Classroom Rumble</h1>
      {!props.isNew && (
        <>
          <CleverButton signup />
          <p className="small">OR</p>
        </>
      )}
      <p>Sign up using email address</p>
      <SignupForm {...props} />
      <p className="small">
        Already have an account? <Link to="/login">Log In Here</Link>
      </p>
    </div>
  );
};

export default RenderSignupPage;
