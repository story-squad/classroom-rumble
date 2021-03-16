import React, { HTMLAttributes } from 'react';

const TableCol = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>): React.ReactElement => (
  <div className={`table-col${className ? ' ' + className : ''}`} {...props}>
    {children}
  </div>
);

export default TableCol;
