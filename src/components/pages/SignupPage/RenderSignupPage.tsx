import React from 'react';
import SignupForm from './SignupForm';
import { ISigninProps } from './signupTypes';

const RenderSignupPage = (props: ISigninProps): React.ReactElement => {
  return (
    <div className="signup-page">
      <h1>Signup</h1>
      <p>Sign up for stuff</p>
      <SignupForm {...props} />
    </div>
  );
};

export default RenderSignupPage;
