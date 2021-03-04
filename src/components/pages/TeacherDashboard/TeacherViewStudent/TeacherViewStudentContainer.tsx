import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import RenderTeacherViewStudent from './RenderTeacherViewStudent';

const TeacherViewStudentContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('student', 'section');
  const student = useRecoilValue(current.student);
  const section = useRecoilValue(current.section);

  return student && section ? (
    <RenderTeacherViewStudent student={student} section={section} />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewStudentContainer;
