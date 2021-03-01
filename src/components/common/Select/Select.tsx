import React from 'react';
import { ISelectProps } from './selectTypes';

const Select = ({
  options = [],
  errors = {},
  name,
  register,
  rules,
  placeholder,
  defaultValue = 'none',
  ...props
}: ISelectProps): React.ReactElement => {
  return (
    <div className={`form-select${errors[name] ? ' error' : ''}`}>
      <select
        {...props}
        name={name}
        ref={register && register(rules)}
        defaultValue={defaultValue}
      >
        {options.map((item, i) => (
          <option key={`${item.value}-${item.label}-${i}`} value={item.value}>
            {item.label}
          </option>
        ))}
        {placeholder && (
          <option value="none" disabled hidden>
            {placeholder}
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
