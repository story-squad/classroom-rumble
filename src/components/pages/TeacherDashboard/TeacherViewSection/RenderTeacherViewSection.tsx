import React from 'react';
import { Sections } from '../../../../api';
import { TeacherDashboardRumbleList } from '../TeacherDashboardRumbleList';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  section,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
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
      <TeacherDashboardRumbleList sections={[section]} />
      <SectionStudentList section={section} />
    </div>
  );
};

interface IRenderTeacherViewSectionProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderTeacherViewSection;
