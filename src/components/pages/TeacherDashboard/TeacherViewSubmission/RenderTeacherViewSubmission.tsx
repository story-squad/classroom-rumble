import React from 'react';
import { Auth, Sections, Submissions } from '../../../../api';

const RenderTeacherViewSubmission = ({
  submission,
  section,
  student,
}: IRenderTeacherViewSubmissionProps): React.ReactElement => {
  return (
    <div className="teacher-view-submission">
      <h2>Submission</h2>
      <img src={submission.src} width="100" height="100" />
    </div>
  );
};

interface IRenderTeacherViewSubmissionProps {
  section: Sections.ISectionWithRumbles;
  student: Auth.IUser;
  submission: Submissions.ISubItem;
}

export default RenderTeacherViewSubmission;
