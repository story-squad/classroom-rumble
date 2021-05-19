import React from 'react';

const MenuItem = ({
  children,
  onClick,
}: React.PropsWithChildren<IMenuItemProps>): React.ReactElement => {
  return (
    <div className="menu-item" onClick={onClick}>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
};

export interface IMenuItemProps {
  onClick?: () => void;
}

export default MenuItem;
