import React from 'react';
import { Auth } from '../../../../api';

const RenderStudentProfile = ({
  user,
}: IUserProfileProps): React.ReactElement => {
  return (
    <div className="profile-wrapper">
      <h2>Account Details</h2>
      <div className="profile-content">
        <h3>
          {user.firstname} {user.lastname}
        </h3>
      </div>
      <div className="profile-content">
        <h3>Username</h3>
        <h4>{user.codename}</h4>
      </div>
    </div>
  );
};

interface IUserProfileProps {
  user: Auth.IUser;
}

export default RenderStudentProfile;
