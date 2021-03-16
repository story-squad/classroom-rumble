import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSubmission from './RenderTeacherViewSubmission';

const TeacherViewSubmissionContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'student', 'sub');
  const section = useRecoilValue(current.section);
  const student = useRecoilValue(current.student);
  const submission = useRecoilValue(current.sub);

  return section && student && submission && !isLoading ? (
    <RenderTeacherViewSubmission
      section={section}
      student={student}
      submission={submission}
    />
  ) : isLoading ? (
    <Loader message="Loading submission" />
  ) : (
    <p>REDIRECTING</p>
  );
};

export default TeacherViewSubmissionContainer;
