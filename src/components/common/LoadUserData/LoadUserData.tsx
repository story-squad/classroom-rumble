import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Auth, InitialState } from '../../../api';
import { app, auth, rumbles, sections } from '../../../state';

const LoadUserData = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const token = useRecoilValue(auth.authToken);
  const addSections = useSetRecoilState(sections.add);
  const addRumbles = useSetRecoilState(rumbles.add);
  const setGradeEnum = useSetRecoilState(app.enum.grades);
  const setSubjectEnum = useSetRecoilState(app.enum.subjects);

  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log({ user, token });
    if (user && token) {
      console.log('running init');
      InitialState.getUserInfo()
        .then((res) => {
          addSections(res.sections);
          const rumbles = res.sections.map((s) => s.rumbles).flat();
          addRumbles(rumbles);

          setGradeEnum(res.enumData.grades);
          setSubjectEnum(res.enumData.subjects);

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
