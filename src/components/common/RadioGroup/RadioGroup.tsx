import React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';
import { FormTypes } from '../../../types';
import RadioButton from './RadioButton';

const RadioGroup = ({
  name,
  errors = {},
  options = [],
  register,
  rules = {},
}: IRadioGroupProps): React.ReactElement => {
  return (
    <div className="radio-group-wrapper">
      <div className="radio-group-list">
        {options.map(({ label, value }) => (
          <RadioButton
            name={name}
            key={value}
            value={value}
            label={label}
            register={register(rules)}
          />
        ))}
      </div>
      {errors[name] && <div className="error">{errors[name].message}</div>}
    </div>
  );
};

interface IRadioGroupProps {
  name: string;
  register: UseFormMethods['register'];
  defaultValue?: unknown;
  rules?: RegisterOptions;
  options?: FormTypes.IOption[];
  errors?: UseFormMethods['errors'];
}

export default RadioGroup;
