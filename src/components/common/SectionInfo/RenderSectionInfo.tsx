import React from 'react';
import { Sections } from '../../../api';
import { Button } from '../Button';

const RenderSectionInfo = ({
  grade,
  subject,
  openInviteModal,
  section,
  isTeacher,
  studentName,
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
        {studentName && (
          <div className="content-item">
            <h3>Student Name</h3>
            <h4>{studentName}</h4>
          </div>
        )}
        {isTeacher && (
          <Button type="secondary" onClick={openInviteModal}>
            Invite Students
          </Button>
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
  studentName?: string;
}

export default RenderSectionInfo;
