import React, { useMemo, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import { HiUserCircle } from 'react-icons/hi';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../../api';
import { useKeyPress } from '../../../hooks';
import { auth } from '../../../state';
import { Menu } from './Menu';

const Header = (): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const userType = useMemo(
    () => (user?.roleId === Auth.Roles.user ? 'student' : 'teacher'),
    [user],
  );
  const { push } = useHistory();
  const goToDashboard = () => push(`/dashboard/${userType}`);

  const [openMenu, setOpenMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  const handleClickBtn = () => {
    setOpenMenu(!openMenu);
  };

  useKeyPress({ key: 'Escape' || 'Esc', action: () => setOpenMenu(false) });

  return (
    <header className="header-wrapper">
      <div className="header-container">
        <h2 onClick={goToDashboard}>Classroom Rumble</h2>
        <div className="user-info">
          <p>Welcome back, {user?.firstname}</p>
          <HiUserCircle
            className="ignore-onclickoutside"
            onClick={handleClickBtn}
          />
          {openMenu && (
            <div className="header-menu" ref={ref}>
              <Menu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
