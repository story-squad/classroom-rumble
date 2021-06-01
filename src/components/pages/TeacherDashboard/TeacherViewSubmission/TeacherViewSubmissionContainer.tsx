import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { sections, students, submissions } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSubmission from './RenderTeacherViewSubmission';

const TeacherViewSubmissionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'student', 'sub');
  const sectionId = useRecoilValue(sections.selected);
  const studentId = useRecoilValue(students.selected);
  const submissionId = useRecoilValue(submissions.selected);

  return sectionId && studentId && submissionId && !isLoading ? (
    <RenderTeacherViewSubmission
      sectionId={sectionId}
      studentId={studentId}
      submissionId={submissionId}
    />
  ) : isLoading ? (
    <Loader message={'Loading submission'} />
  ) : (
    <p>REDIRECTING</p>
  );
};

export default TeacherViewSubmissionContainer;
