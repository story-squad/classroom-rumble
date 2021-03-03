import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Auth, Sections } from '../../../../api';
import RenderTeacherViewStudent from './RenderTeacherViewStudent';

const TeacherViewStudentContainer = ({
  history,
}: RouteComponentProps): React.ReactElement => {
  const { student, section } = useMemo(
    () =>
      history.location.state as {
        student: Auth.IUser;
        section: Sections.ISection;
      },
    [history],
  );
  return <RenderTeacherViewStudent student={student} section={section} />;
};

export default TeacherViewStudentContainer;
