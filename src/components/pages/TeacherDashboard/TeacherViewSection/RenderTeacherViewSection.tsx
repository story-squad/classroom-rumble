import React, { useMemo } from 'react';
import { Sections } from '../../../../api';
import { RumbleList } from '../../../common';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  section,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
  const rumbleList = useMemo(
    () =>
      section.rumbles?.map((r) => ({
        ...r,
        sectionName: section.name,
        sectionId: section.id,
      })),
    [section.rumbles, section.name, section.id],
  );
  return (
    <div className="teacher-view-section">
      <h2>Section: {section.name}</h2>
      <div className="section-info">
        <div>Grade: {section.gradeId}</div>
        <div>Subject: {section.subjectId}</div>
        <div>
          Join URL: http://localhost:3000/dashboard/student/join?joinCode=
          {section.joinCode}
          &sectionId={section.id}
        </div>
      </div>
      <RumbleList rumbles={rumbleList} />
      <SectionStudentList section={section} />
    </div>
  );
};

interface IRenderTeacherViewSectionProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderTeacherViewSection;
