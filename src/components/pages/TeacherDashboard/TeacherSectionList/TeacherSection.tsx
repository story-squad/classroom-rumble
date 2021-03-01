import React from 'react';
import { ISection } from '../../../../api/Sections';

const TeacherSection = ({ id, joinCode }: ISection): React.ReactElement => {
  return (
    <div className="teacher-section">
      <p>
        Join Code:{' '}
        <span>
          http://localhost:3000/dashboard/student/join?joinCode={joinCode}
          &sectionId={id}
        </span>
      </p>
    </div>
  );
};

export default TeacherSection;
