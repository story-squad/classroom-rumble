import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { auth } from '../../../state';

const ReadTokenData = (): React.ReactElement => {
  const [isLogged, login] = useRecoilState(auth.isLoggedIn);
  useEffect(() => {
    if (!isLogged) {
      login(undefined);
    }
  }, []);
  return <></>;
};

export default ReadTokenData;
