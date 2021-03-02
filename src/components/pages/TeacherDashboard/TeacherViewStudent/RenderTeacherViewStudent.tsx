import React from 'react';
import { Auth } from '../../../../api';
import { SubmissionList } from './SubmissionList';

const RenderTeacherViewStudent = ({
  codename,
  firstname,
  lastname,
  email,
  id,
}: Auth.IUser): React.ReactElement => {
  return (
    <div className="teacher-view-student">
      <h2>
        {firstname} {lastname} <em>({codename})</em>
      </h2>
      <div className="student-info">
        <div>Email: {email}</div>
      </div>
      <SubmissionList studentId={id} />
    </div>
  );
};

export default RenderTeacherViewStudent;
