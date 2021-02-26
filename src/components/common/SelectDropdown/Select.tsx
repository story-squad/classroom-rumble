import React from 'react';
import { ISelectProps } from './selectTypes';

const Select = ({
  options = [],
  errors = {},
  name,
  register,
  rules,
  placeholder,
  ...props
}: ISelectProps): React.ReactElement => {
  return (
    <div className={`form-select${errors[name] ? ' error' : ''}`}>
      <select {...props} name={name} ref={register && register(rules)}>
        {options.map((item) => (
          <option key={item.value}>{item.label}</option>
        ))}
        {placeholder && (
          <option value="none" selected disabled hidden>
            {placeholder}
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
