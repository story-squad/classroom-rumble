import React, { useContext } from 'react';
import { CgClose, CgMoreVertical } from 'react-icons/cg';
import { Menu } from '../Menu';
import CardContext from './CardContext';

const CardMenu = ({ items, title }: ICardMenuProps): React.ReactElement => {
  const { menuOpen, setMenuOpen } = useContext(CardContext);

  return (
    <div className="card-menu">
      {menuOpen && (
        <Menu left title={title} isOpen={menuOpen} setIsOpen={setMenuOpen}>
          {items?.map((it, i) => (
            <Menu.Item key={i} onClick={it.onClick}>
              {it.text}
            </Menu.Item>
          ))}
        </Menu>
      )}
      <div
        className={`card-menu-button ${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <CgClose /> : <CgMoreVertical />}
      </div>
    </div>
  );
};

export type MenuItem = {
  text: React.ReactNode;
  onClick?: () => void;
};

export interface ICardMenuProps {
  title?: React.ReactNode;
  items?: MenuItem[];
}

export default CardMenu;
