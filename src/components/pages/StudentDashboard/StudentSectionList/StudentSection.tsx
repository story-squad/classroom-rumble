import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../../../api';
import { ISection } from '../../../../api/Sections';
import { auth } from '../../../../state';

const StudentSection = ({
  active,
  id,
  gradeId,
  joinCode,
  name,
  subjectId,
}: ISection): React.ReactElement => {
  const { push } = useHistory();
  const user = useRecoilValue(auth.user);
  const role = useMemo(
    () => (user?.roleId === Auth.Roles.user ? 'student' : 'teacher'),
    [user],
  );

  const openSectionList = () => {
    push(`/dashboard/${role}/section`);
  };
  return (
    <div className="student-section" onClick={openSectionList}>
      <p>ID: {id}</p>
      <p>Name: {name} </p>
      <p>Grade ID: {gradeId}</p>
      <p>Subject ID: {subjectId}</p>
      <p>ACtive: {active}</p>
      <p>JoinCode: {joinCode}</p>
    </div>
  );
};

export default StudentSection;
