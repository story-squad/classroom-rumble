import React from 'react';
import { Auth } from '../../../../../api';

const StudentCard = ({
  codename,
  email,
  firstname,
  lastname,
}: Auth.IUser): React.ReactElement => {
  return (
    <div className="student-card">
      <h3>
        {firstname} {lastname}
      </h3>
      <p>{codename}</p>
      <p>{email}</p>
    </div>
  );
};

export default StudentCard;
