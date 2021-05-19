import React, { HTMLAttributes, useRef, useState } from 'react';
import CardBody from './CardBody';
import CardContext, { ICardContext } from './CardContext';
import CardFooter, { ICardFooterProps } from './CardFooter';
import CardHeader, { ICardHeaderProps } from './CardHeader';
import CardMenu, { ICardMenuProps } from './CardMenu';
import TopRight from './TopRight';

const Card: React.FC<ICardProps & HTMLAttributes<HTMLDivElement>> &
  ICardComposition = ({ children, className, topRight, ...props }) => {
  const [topRightSize, setTopRightSize] = useState<string>();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  return (
    <CardContext.Provider
      value={{
        hasTopRight: topRight !== undefined,
        topRightSize,
        setTopRightSize,
        headerRef,
        bodyRef,
        setMenuOpen,
        menuOpen,
      }}
    >
      <div className={'card' + (className ? ' ' + className : '')} {...props}>
        {topRight && <TopRight>{topRight}</TopRight>}
        {children}
      </div>
    </CardContext.Provider>
  );
};

export interface ICardProps {
  topRight?: React.ReactNode;
}

interface ICardComposition {
  Body: React.FC;
  Header: React.FC<ICardHeaderProps>;
  Footer: React.FC<ICardFooterProps>;
  Menu: React.FC<ICardMenuProps>;
  context: React.Context<ICardContext>;
}

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Menu = CardMenu;
Card.context = CardContext;

export default Card;
