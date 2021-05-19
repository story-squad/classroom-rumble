import React from 'react';

const CardFooter = ({
  children,
  hideDivider = false,
  right = false,
}: React.PropsWithChildren<ICardFooterProps>): React.ReactElement => {
  return (
    <div
      className={`card-footer\
      ${hideDivider ? ' hide-divider' : ''}\
      ${right ? ' right-align' : ''}\
      `}
    >
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
};

export interface ICardFooterProps {
  hideDivider?: boolean;
  right?: boolean;
}

export default CardFooter;
