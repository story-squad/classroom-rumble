import React, { useMemo } from 'react';
import { Auth, Feedback, Sections, Submissions } from '../../../../api';
import {
  Feedback as FeedbackComponent,
  PromptBox,
  SectionInfo,
} from '../../../common';

const RenderTeacherViewSubmission = ({
  submission,
  section,
  student,
  questions,
}: IRenderTeacherViewSubmissionProps): React.ReactElement => {
  const studentName = useMemo(
    () => `${student.firstname} ${student.lastname}`,
    [student],
  );
  return (
    <div className="teacher-view-submission">
      <PromptBox prompt={submission.prompt} isTeacher />
      <SectionInfo section={section} studentName={studentName} />
      <FeedbackComponent submission={submission} questions={questions} />
    </div>
  );
};

interface IRenderTeacherViewSubmissionProps {
  section: Sections.ISectionWithRumbles;
  student: Auth.IUser;
  submission: Submissions.ISubItem;
  questions: Feedback.IFeedbackQuestions[];
}

export default RenderTeacherViewSubmission;
