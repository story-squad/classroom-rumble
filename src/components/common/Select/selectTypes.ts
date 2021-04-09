import { RegisterOptions, UseFormMethods } from 'react-hook-form';
import { FormTypes } from '../../../types';

export interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options?: FormTypes.IOption[];
  register: UseFormMethods['register'];
  type?: string;
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
  placeholder?: string;
  error?: boolean;
}
