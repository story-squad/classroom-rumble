import React from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { reset } from '../../../../state';
import { token } from '../../../../utils';

const Logout = (): React.ReactElement => {
  const { push } = useHistory();
  const resetRecoilState = useSetRecoilState(reset);
  const logout = () => {
    resetRecoilState(undefined);
    token.clear();
    token.clearUser();
    push('/');
  };
  return (
    <div>
      <a onClick={logout}>Logout</a>
    </div>
  );
};

export default Logout;
