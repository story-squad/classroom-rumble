import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import { current } from '../../../../state';

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

  const setCurrentSection = useSetRecoilState(current.section);

  const openSection = () => {
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
    push('/dashboard/student/section', {
      section: currentSection,
    });
  };
  return (
    <div className="student-section" onClick={openSection}>
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
