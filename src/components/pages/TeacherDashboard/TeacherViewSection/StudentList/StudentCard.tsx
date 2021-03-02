import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../../../../api';

const StudentCard = ({
  codename,
  email,
  firstname,
  lastname,
  ...student
}: Auth.IUser): React.ReactElement => {
  const { push } = useHistory();

  const openStudent = () => {
    push('/dashboard/teacher/student', {
      ...student,
      codename,
      email,
      firstname,
      lastname,
    });
  };

  return (
    <div className="student-card" onClick={openStudent}>
      <h3>
        {firstname} {lastname}
      </h3>
      <p>{codename}</p>
      <p>{email}</p>
    </div>
  );
};

export default StudentCard;
