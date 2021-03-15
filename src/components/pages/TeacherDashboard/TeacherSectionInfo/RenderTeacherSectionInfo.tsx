import React from 'react';
import { Sections } from '../../../../api';

const RenderTeacherSectionInfo = ({
  grade,
  subject,
  openInviteModal,
  section,
}: IRenderTeacherSectionInfoProps): React.ReactElement => (
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
);

interface IRenderTeacherSectionInfoProps {
  section: Sections.ISectionWithRumbles;
  openInviteModal: () => void;
  grade: string;
  subject: string;
}

export default RenderTeacherSectionInfo;
