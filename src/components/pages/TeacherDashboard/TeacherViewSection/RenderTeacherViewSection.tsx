import React, { useMemo } from 'react';
import { Sections } from '../../../../api';
import { RumbleList } from '../../../common';
import { StudentList } from './StudentList';

const RenderTeacherViewSection = ({
  name,
  gradeId,
  subjectId,
  joinCode,
  id,
  rumbles,
  active,
}: Sections.ISectionWithRumbles): React.ReactElement => {
  const rumbleList = useMemo(
    () =>
      rumbles.map((r) => ({
        ...r,
        sectionName: name,
        sectionId: id,
      })),
    [rumbles, name, id],
  );
  return (
    <div className="teacher-view-section">
      <h2>Section: {name}</h2>
      <div className="section-info">
        <div>Grade: {gradeId}</div>
        <div>Subject: {subjectId}</div>
        <div>
          Join URL: http://localhost:3000/dashboard/student/join?joinCode=
          {joinCode}
          &sectionId={id}
        </div>
      </div>
      <RumbleList rumbles={rumbleList} />
      <StudentList
        section={{ name, gradeId, subjectId, joinCode, id, active }}
      />
    </div>
  );
};

export default RenderTeacherViewSection;
