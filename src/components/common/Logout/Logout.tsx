import React from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { reset } from '../../../state';
import { token } from '../../../utils';

const Logout = (): React.ReactElement => {
  // const [isVisible, setIsVisible] = useRecoilState(auth.logoutModalOpen);
  const { push } = useHistory();
  const resetRecoilState = useSetRecoilState(reset);
  const logout = () => {
    resetRecoilState(undefined);
    token.clear();
    token.clearUser();
    push('/');
  };
  return (
    <div className="logout">
      <p onClick={logout}>Logout</p>
    </div>
  );
};

export default Logout;
