import React from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import AuthHeader from './AuthForms/AuthHeader';
import LoginForm from './AuthForms/LoginForm';
import SignUpForm from './AuthForms/SignUpForm';

const RenderAuthPage = (): React.ReactElement => {
  const isLogin = useRecoilValue(auth.form.isLogin);
  return (
    <div className="auth-page-wrapper">
      <div className="auth-page">
        <AuthHeader />
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default RenderAuthPage;
