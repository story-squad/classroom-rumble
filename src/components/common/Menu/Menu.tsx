import React, { Dispatch, HTMLAttributes, SetStateAction } from 'react';
import { useClickOutside } from '../../../hooks';
import MenuItem, { IMenuItemProps } from './MenuItem';

const Menu: React.FC<IMenuProps> & IMenuComposition = ({
  title,
  children,
  isOpen,
  setIsOpen,
  style,
  right,
  left,
  bottom,
  top,
}) => {
  const clickRef = useClickOutside({
    isActive: isOpen,
    onClick: () => setIsOpen(false),
  });

  return (
    <div
      className={`menu\
    ${right ? ' right' : ''}\
    ${left ? ' left' : ''}\
    ${bottom ? ' bottom' : ''}\
    ${top ? ' top' : ''}\
    `}
      ref={clickRef}
      style={style}
    >
      {
        // Only render a title if one is passed in
        // Render the title in an h3 if it's a string, or just render the node
        title && (typeof title === 'string' ? <h2>{title}</h2> : title)
      }
      {children && <div className="menu-list">{children}</div>}
    </div>
  );
};

export interface IMenuProps {
  title?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  style?: HTMLAttributes<HTMLDivElement>['style'];

  // Arrow stuff
  right?: boolean;
  left?: boolean;
  top?: boolean;
  bottom?: boolean;
}

export interface IMenuComposition {
  Item: React.FC<IMenuItemProps>;
}

Menu.Item = MenuItem;

export default Menu;
