import React from 'react';
import { ISection } from '../../../../api/Sections';

const StudentSection = ({
  active,
  id,
  grade,
  joinCode,
  name,
  subject,
}: ISection): React.ReactElement => {
  return (
    <div className="student-section">
      {id}
      {name}
      {grade}
      {subject}
      {active}
      {joinCode}
    </div>
  );
};

export default StudentSection;
