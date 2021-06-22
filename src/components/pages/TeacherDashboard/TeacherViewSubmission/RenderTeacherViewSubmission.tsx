import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { students, submissions } from '../../../../state';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../common';

const RenderTeacherViewSubmission = ({
  submissionId,
  sectionId,
  studentId,
}: IRenderTeacherViewSubmissionProps): React.ReactElement => {
  const student = useRecoilValue(students.getById(studentId));
  const submission = useRecoilValue(submissions.getById(submissionId));

  const studentName = useMemo(
    () => (student ? `${student.firstname} ${student.lastname}` : undefined),
    [student],
  );
  return (
    <div className="teacher-view-submission">
      <PromptBox prompt={submission?.prompt} isTeacher />
      <SectionInfo sectionId={sectionId} studentName={studentName} />
      <FeedbackDisplay submissionId={submissionId} />
    </div>
  );
};

interface IRenderTeacherViewSubmissionProps {
  sectionId: number;
  studentId: number;
  submissionId: number;
}

export default RenderTeacherViewSubmission;
