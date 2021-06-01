import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Auth, InitialState } from '../../../api';
import { auth, enumData, rumbles, sections } from '../../../state';

const LoadUserData = (): React.ReactElement => {
  const [isLogged, login] = useRecoilState(auth.isLoggedIn);
  const user = useRecoilValue(auth.user);
  const addSections = useSetRecoilState(sections.add);
  const addRumbles = useSetRecoilState(rumbles.add);
  const setGradeEnum = useSetRecoilState(enumData.grades);
  const setSubjectEnum = useSetRecoilState(enumData.subjects);

  const { push } = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLogged) {
      login(undefined);
    }
  }, []);

  useEffect(() => {
    if (user)
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
  }, [user]);

  return <></>;
};

export default LoadUserData;
