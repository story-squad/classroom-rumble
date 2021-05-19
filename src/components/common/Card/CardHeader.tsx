import React, { HTMLAttributes, useContext } from 'react';
import CardContext from './CardContext';

const CardHeader = ({
  hideDivider = false,
  children,
  className,
  ...props
}: React.PropsWithChildren<
  ICardHeaderProps & HTMLAttributes<HTMLDivElement>
>): React.ReactElement => {
  const { headerRef } = useContext(CardContext);

  return (
    <div
      className={`card-header\
      ${hideDivider ? ' hide-divider' : ''}\
      ${className ? ' ' + className : ''}\
      `}
      {...props}
    >
      {typeof children === 'string' ? (
        <h2 ref={headerRef}>{children}</h2>
      ) : (
        children
      )}
    </div>
  );
};

export interface ICardHeaderProps {
  hideDivider?: boolean;
}

export default CardHeader;
