import React, { HTMLAttributes } from 'react';

const TableHeader = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  HTMLAttributes<HTMLDivElement>
>): React.ReactElement => (
  <div className="table-header">
    <div
      className={`row-wrapper${className ? ' ' + className : ''}`}
      {...props}
    >
      {children}
    </div>
  </div>
);

export default TableHeader;
