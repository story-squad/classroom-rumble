import React from 'react';

const AuthHeader = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (arg: boolean) => void;
}): React.ReactElement => {
  return (
    <div className="auth-header">
      <a onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>
        Login
      </a>
      <a onClick={() => setIsLogin(false)} className={isLogin ? '' : 'active'}>
        Signup
      </a>
    </div>
  );
};

export default AuthHeader;
