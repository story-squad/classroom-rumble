import React from 'react';
import { Sections } from '../../../../api';
import { InviteToSection } from '../InviteToSection';
import { TeacherDashboardRumbleList } from '../TeacherDashboardRumbleList';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  section,
  openInviteModal,
  grade,
  subject,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
  return (
    <>
      <InviteToSection disableSectionPicker />
      <div className="teacher-view-section">
        <div className="section-info-wrapper">
          <div className="section-info-container">
            <div className="content">
              <div className="content-item">
                <h3>Class Name</h3>
                <h4>{section.name}</h4>
              </div>
              <div className="content-item">
                <h3>Grade</h3>
                <h4>{grade}</h4>
              </div>
              <div className="content-item">
                <h3>Subject</h3>
                <h4>{subject}</h4>
              </div>
            </div>
            <button onClick={openInviteModal}>Invite Students</button>
          </div>
        </div>
        <TeacherDashboardRumbleList sections={[section]} />
        <SectionStudentList section={section} />
      </div>
    </>
  );
};

interface IRenderTeacherViewSectionProps {
  section: Sections.ISectionWithRumbles;
  openInviteModal: () => void;
  grade: string;
  subject: string;
}

export default RenderTeacherViewSection;
