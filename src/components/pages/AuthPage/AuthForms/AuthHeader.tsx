import React from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../../../state';

const AuthHeader = (): React.ReactElement => {
  const [isLogin, setIsLogin] = useRecoilState(auth.form.isLogin);
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
