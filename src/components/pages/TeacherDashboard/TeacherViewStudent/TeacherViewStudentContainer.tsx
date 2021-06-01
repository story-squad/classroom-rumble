import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { sections, students } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewStudent from './RenderTeacherViewStudent';

const TeacherViewStudentContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('student', 'section');
  const student = useRecoilValue(students.current);
  const section = useRecoilValue(sections.current);

  return student && section && !isLoading ? (
    <RenderTeacherViewStudent student={student} section={section} />
  ) : isLoading ? (
    <Loader message={'Loading student'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewStudentContainer;
