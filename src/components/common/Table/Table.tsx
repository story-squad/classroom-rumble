import React from 'react';
import { TableHeading, TableRow } from './TableData';
import { TableProps } from './TableTypes';

const Table = (props: TableProps): React.ReactElement => {
  return (
    <div className="table">
      <div className="table-header-row">
        {props.headings.map((h, i) => (
          <TableHeading {...h} key={i} />
        ))}
      </div>
      <div className="table-body">
        {props.rows.map((r, i) => (
          <TableRow headings={props.headings} row={r} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Table;
