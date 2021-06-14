import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Auth, InitialState } from '../../../api';
import { app, auth } from '../../../state';

/**
 * This component runs the app state initialization. It gets certain enum
 * data from the server as well as a list of the currently logged-in users'
 * sections and rumbles.
 */
const LoadUserData = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const token = useRecoilValue(auth.authToken);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const setInitialAppState = useSetRecoilState(app.init);

  useEffect(() => {
    if (user && token) {
      InitialState.getUserInfo()
        .then((res) => {
          setInitialAppState(res);

          // Route to dashboard if they're not already on it
          if (!pathname.includes('dashboard')) {
            let userType = Auth.Roles[user.roleId];
            if (userType === 'user') userType = 'student';
            push(`/dashboard/${userType}`);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user, token]);

  return <></>;
};

export default LoadUserData;
