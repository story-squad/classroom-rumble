import React from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { reset } from '../../../../state';

const Logout = (): React.ReactElement => {
  const { push } = useHistory();
  const resetRecoilState = useSetRecoilState(reset);
  const logout = () => {
    resetRecoilState(undefined);
    push('/');
  };
  return (
    <div onClick={logout}>
      <p>Logout</p>
    </div>
  );
};

export default Logout;
