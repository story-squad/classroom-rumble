import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { InitialState } from '../../../api';
import { Roles } from '../../../api/Auth';
import { IRumbleWithSectionInfo } from '../../../api/Rumbles';
import { ISectionWithRumbles } from '../../../api/Sections';
import { auth, enumData, rumbles, sections } from '../../../state';

const LoadUserData = (): React.ReactElement => {
  const [isLogged, login] = useRecoilState(auth.isLoggedIn);
  const user = useRecoilValue(auth.user);
  const setRumbles = useSetRecoilState(rumbles.list);
  const setSections = useSetRecoilState(sections.list);
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
          setRumbles(getRumblesFromSectionList(res.sections));
          setSections(res.sections);
          setGradeEnum(res.enumData.grades);
          setSubjectEnum(res.enumData.subjects);

          // Route to dashboard if they're not already on it
          if (!pathname.includes('dashboard')) {
            let userType = Roles[user.roleId];
            if (userType === 'user') userType = 'student';
            push(`/dashboard/${userType}`);
          }
        })
        .catch((err) => console.log(err));
  }, [user]);

  return <></>;
};

const getRumblesFromSectionList = (sections: ISectionWithRumbles[]) => {
  const rumbles: IRumbleWithSectionInfo[] = [];

  for (const sec of sections) {
    rumbles.push(
      ...sec.rumbles.map((rumble) => ({
        ...rumble,
        sectionName: sec.name,
        sectionId: sec.id,
      })),
    );
  }
  return rumbles;
};

export default LoadUserData;
