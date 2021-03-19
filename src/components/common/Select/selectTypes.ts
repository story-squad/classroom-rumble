import { RegisterOptions, UseFormMethods } from 'react-hook-form';

export interface IOption<T = string | number> {
  value: T;
  label: string;
}

export interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options?: IOption[];
  register: UseFormMethods['register'];
  type?: string;
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
  placeholder?: string;
  error?: boolean;
}
