import React from 'react';
import { ISection } from '../../../../api/Sections';

const StudentSection = ({
  active,
  id,
  gradeId,
  joinCode,
  name,
  subjectId,
}: ISection): React.ReactElement => {
  return (
    <div className="student-section">
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
