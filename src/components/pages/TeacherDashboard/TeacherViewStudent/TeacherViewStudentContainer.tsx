import React from 'react';
import { useRecoilValue } from 'recoil';
import { sections, students } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewStudent from './RenderTeacherViewStudent';

const TeacherViewStudentContainer = (): React.ReactElement => {
  const student = useRecoilValue(students.current);
  const section = useRecoilValue(sections.current);

  return student && section ? (
    <RenderTeacherViewStudent student={student} section={section} />
  ) : (
    <Loader message={'Loading student'} />
  );
};

export default TeacherViewStudentContainer;
