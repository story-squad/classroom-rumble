import React, { HTMLAttributes } from 'react';

const TableBody = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>): React.ReactElement => (
  <div className={`table-body${className ? ' ' + className : ''}`} {...props}>
    {children}
  </div>
);

export default TableBody;
