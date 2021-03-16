import React from 'react';
import { Sections } from '../../../api';

const RenderSectionInfo = ({
  grade,
  subject,
  openInviteModal,
  section,
  isTeacher,
}: IRenderSectionInfoProps): React.ReactElement => (
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
        {isTeacher && (
          <button onClick={openInviteModal}>Invite Students</button>
        )}
      </div>
    </div>
  </div>
);

interface IRenderSectionInfoProps {
  section: Sections.ISectionWithRumbles;
  openInviteModal: () => void;
  grade: string;
  subject: string;
  isTeacher: boolean;
}

export default RenderSectionInfo;
