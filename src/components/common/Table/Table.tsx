import React from 'react';

const head = ['name', 'password'];
const row = [{ name: 123, password: '23' }];

const Table = <
  T extends Record<string, unknown>,
  U extends { [key in keyof T]: unknown }
>({}: ITableProps<U>): React.ReactElement => {
  return (
    <div className="table-wrapper">
      <div>rtabfzfd</div>
    </div>
  );
};

{
  /* <Table headers={head} rows={row} />; */
}

interface ITableProps<U extends Record<string, unknown>> {
  headers: (keyof U)[];
  rows: U[];
}

// const Table = <T extends string, U extends Record<T, React.ReactNode>>({
//   headers,
//   rows,
// }: ITableProps<T, U>): React.ReactElement => {};

// const head = ['thing', 'asdf'];
// interface ITableProps<T extends string> {
//   headers: T[];
//   rows: Record<T, React.ReactNode>[];
// }

// const TDS = () => <Table headers={head} rows={[{}]} />;

export default Table;
