import React from 'react';
import { ISection } from '../../../../api/Sections';

const TeacherSection = ({
  active,
  id,
  grade,
  joinCode,
  name,
  subject,
}: ISection): React.ReactElement => {
  return (
    <div className="teacher-section">
      {id}
      {name}
      {grade}
      {subject}
      {active}
      {joinCode}
    </div>
  );
};

export default TeacherSection;
