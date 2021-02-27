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
      {id}
      {name}
      {gradeId}
      {subjectId}
      {active}
      {joinCode}
    </div>
  );
};

export default StudentSection;
