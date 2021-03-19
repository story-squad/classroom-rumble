import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Auth, Sections } from '../../../../api';
import { auth, current } from '../../../../state';

const StudentSection = ({
  active,
  id,
  gradeId,
  joinCode,
  name,
  subjectId,
  ...section
}: Sections.ISectionWithRumbles): React.ReactElement => {
  const { push } = useHistory();
  const user = useRecoilValue(auth.user);
  const role = useMemo(
    () => (user?.roleId === Auth.Roles.user ? 'student' : 'teacher'),
    [user],
  );

  const setCurrentSection = useSetRecoilState(current.section);

  const openSectionList = () => {
    const currentSection = {
      ...section,
      id,
      joinCode,
      active,
      name,
      subjectId,
      gradeId,
    };
    setCurrentSection(currentSection);
    push(`/dashboard/${role}/section`, {
      section: currentSection,
    });
  };
  return (
    <div className="student-section" onClick={openSectionList}>
      <p>ID: {id}</p>
      <p>Name: {name} </p>
      <p>Grade ID: {gradeId}</p>
      <p>Subject ID: {subjectId}</p>
      <p>Active: {active}</p>
      <p>JoinCode: {joinCode}</p>
    </div>
  );
};

export default StudentSection;
