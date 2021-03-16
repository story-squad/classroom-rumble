import React, { HTMLAttributes } from 'react';

const TableRow = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>): React.ReactElement => (
  <div className="table-row">
    <div
      className={`row-wrapper${className ? ' ' + className : ''}`}
      {...props}
    >
      {children}
    </div>
  </div>
);

export default TableRow;
