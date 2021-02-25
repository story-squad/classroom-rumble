import { RegisterOptions, UseFormMethods } from 'react-hook-form';

export interface IOption {
  value: string;
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
