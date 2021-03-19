import React, { useMemo } from 'react';
import { Auth, Sections, Submissions } from '../../../../api';
import { PromptBox, SectionInfo } from '../../../common';

const RenderTeacherViewSubmission = ({
  submission,
  section,
  student,
}: IRenderTeacherViewSubmissionProps): React.ReactElement => {
  const studentName = useMemo(
    () => `${student.firstname} ${student.lastname}`,
    [student],
  );
  return (
    <div className="teacher-view-submission">
      <PromptBox prompt={submission.prompt} />
      <SectionInfo section={section} studentName={studentName} />
      <div className="image-wrapper">
        <div className="image-container">
          <img src={submission.src} />
        </div>
      </div>
    </div>
  );
};

interface IRenderTeacherViewSubmissionProps {
  section: Sections.ISectionWithRumbles;
  student: Auth.IUser;
  submission: Submissions.ISubItem;
}

export default RenderTeacherViewSubmission;
