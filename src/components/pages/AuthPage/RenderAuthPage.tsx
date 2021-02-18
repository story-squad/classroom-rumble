import React, { useState } from 'react';
import AuthHeader from './AuthForms/AuthHeader';
import LoginForm from './AuthForms/LoginForm';
import SignUpForm from './AuthForms/SignUpForm';

const RenderAuthPage = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page">
        <AuthHeader isLogin={isLogin} setIsLogin={setIsLogin} />
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignUpForm isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default RenderAuthPage;
