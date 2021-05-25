import React, { useMemo } from 'react';
import { Auth, Sections, Submissions } from '../../../../api';
import { feedbackQuestions } from '../../../../config';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../common';

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
      <PromptBox prompt={submission.prompt} isTeacher />
      <SectionInfo section={section} studentName={studentName} />
      <FeedbackDisplay submission={submission} questions={feedbackQuestions} />
    </div>
  );
};

interface IRenderTeacherViewSubmissionProps {
  section: Sections.ISectionWithRumbles;
  student: Auth.IUser;
  submission: Submissions.ISubItem;
}

export default RenderTeacherViewSubmission;
