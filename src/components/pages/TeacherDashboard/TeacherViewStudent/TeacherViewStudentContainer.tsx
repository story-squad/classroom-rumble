import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Auth } from '../../../../api';
import RenderTeacherViewStudent from './RenderTeacherViewStudent';

const TeacherViewStudentContainer = ({
  history,
}: RouteComponentProps): React.ReactElement => {
  const student = useMemo(() => history.location.state as Auth.IUser, [
    history,
  ]);
  return <RenderTeacherViewStudent {...student} />;
};

export default TeacherViewStudentContainer;
