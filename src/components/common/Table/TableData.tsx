import React from 'react';
import { TableColProps, TableHeadingProps, TableRowProps } from './TableTypes';

export const TableRow = (props: TableRowProps): React.ReactElement => {
  return (
    <div className="table-row">
      {props.headings.map((h, i) => (
        <TableCol content={props.row[h.propName]} key={i} />
      ))}
    </div>
  );
};

export const TableCol = (props: TableColProps): React.ReactElement => {
  return <div className="row-col">{props.content}</div>;
};

export const TableHeading = (props: TableHeadingProps): React.ReactElement => {
  return <div className="table-header">{props.display}</div>;
};
