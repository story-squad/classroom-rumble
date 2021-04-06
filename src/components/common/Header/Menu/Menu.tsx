import React from 'react';
import Logout from './Logout';

// For future things to be added for the drop down

const Menu = ({
  ref,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): React.ReactElement => {
  return (
    <div className="header-menu" ref={ref}>
      <Logout />
    </div>
  );
};

export default Menu;
