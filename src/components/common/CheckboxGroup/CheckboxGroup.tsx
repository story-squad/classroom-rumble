import React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';
import { FormTypes } from '../../../types';
import { Checkbox } from '../Checkbox';

const CheckboxGroup = ({
  options = [],
  errors = {},
  id,
  name,
  register,
  rules,
  defaultValue,
  ...props
}: ICheckboxGroupProps): React.ReactElement => {
  return (
    <div className="checkbox-group-wrapper">
      <div className="checkbox-group-container">
        <fieldset>
          {options.map((o, i) => (
            <Checkbox
              key={o.value}
              id={`${id}-${o.value}`}
              label={<div>{o.label}</div>}
              name={`${name}[${i}]`}
              register={register}
              rules={rules}
              defaultChecked={defaultValue === o.value}
              {...props}
            />
          ))}
        </fieldset>
      </div>
      {errors[name] && <div className="errors">{errors[name].message}</div>}
    </div>
  );
};

interface ICheckboxGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  options?: FormTypes.IOption[];
  register: UseFormMethods['register'];
  rules?: RegisterOptions;
  errors?: UseFormMethods['errors'];
}

export default CheckboxGroup;
