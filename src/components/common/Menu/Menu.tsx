import React from 'react';
import { Logout } from '../Logout';

// For future things to be added for the drop down

const Menu = (): React.ReactElement => {
  return (
    <div>
      <Logout />
      <div>
        <p>Menu Thing</p>
      </div>
      <div>
        <p>Menu Thing 2</p>
      </div>
    </div>
  );
};

export default Menu;
