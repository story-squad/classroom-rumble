import React, { useMemo } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../../api';
import { auth } from '../../../state';

const Header = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const userType = useMemo(
    () => (user?.roleId === Auth.Roles.user ? 'student' : 'teacher'),
    [user],
  );
  const { push } = useHistory();
  const goToDashboard = () => push(`/dashboard/${userType}`);

  return (
    <header className="header-wrapper">
      <div className="header-container">
        <h2 onClick={goToDashboard}>Classroom Rumble</h2>
        <div className="user-info">
          <p>Welcome back, {user?.firstname}</p>
          <HiUserCircle />
        </div>
      </div>
    </header>
  );
};

export default Header;
