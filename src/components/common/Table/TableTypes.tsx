export interface TableRowProps {
  headings: TableHeadingProps[];
  row: Record<string, string | number>;
}

export interface TableColProps {
  content: string | number;
}

export interface TableProps {
  rows: Record<string, string | number>[];
  headings: TableHeadingProps[];
}

export interface TableHeadingProps {
  display: string;
  propName: string;
}
