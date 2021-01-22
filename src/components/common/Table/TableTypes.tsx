export interface TableRowProps {
  headings: TableHeadingProps[];
  row: TableItem;
}

export interface TableColProps {
  content: string | number;
}

export interface TableProps {
  rows: TableItem[];
  headings: TableHeadingProps[];
}

export interface TableHeadingProps {
  display: string;
  propName: string;
}

export interface TableItem {
  [key: string]: string | number;
}
