import React from 'react';
import { FormTypes } from '../../../types';

const RadioButton = ({
  label,
  value,
  name,
  register,
  ...props
}: IRadioButtonProps &
  React.InputHTMLAttributes<HTMLInputElement>): React.ReactElement => {
  return (
    <div className="radio-button">
      <label className="radio-button-label">{label}</label>
      <input
        className="radio-button-input"
        type="radio"
        name={name}
        value={value}
        ref={register}
        {...props}
      />
    </div>
  );
};

interface IRadioButtonProps extends FormTypes.IOption {
  name: string;
  register: React.LegacyRef<HTMLInputElement>;
}

export default RadioButton;
