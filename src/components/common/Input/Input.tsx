import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ReactInputMask from 'react-input-mask';

const PHONE_MASK = '(999) 999-9999';

const Input = ({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  control,
  errors = {},
  rules = {},
  defaultValue,
  ...inputProps
}: IInputProps): React.ReactElement => {
  // store the type prop in state so that it can be changed to show/hide the value in a password input
  const [inputType, setInputType] = useState(type);
  // Reveals or hides the value in a password input by toggling the 'type' on the input between 'text' and 'password'
  const toggleHiddenPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="input-field">
      <div className="input-wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field: { value, ...field } }) => {
            return type === 'date' ? (
              <ReactDatePicker
                placeholderText={placeholder}
                {...field}
                selected={value}
              />
            ) : type === 'time' ? (
              <ReactDatePicker
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                placeholderText={placeholder}
                selected={value}
                {...field}
              />
            ) : type === 'phone' ? (
              <ReactInputMask
                id={id}
                type={type}
                mask={PHONE_MASK}
                value={value}
                {...field}
                {...inputProps}
              />
            ) : (
              <>
                <input
                  id={id}
                  type={type}
                  value={value}
                  {...field}
                  {...inputProps}
                />
                {
                  // TODO add ability to opt out of show password feature
                  type === 'password' && (
                    <button
                      type="button"
                      className="show-hide-btn"
                      tabIndex={-1} // Prevents button from being selected while tabbing
                      onClick={toggleHiddenPassword}
                    >
                      {inputType === 'password' ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  )
                }
              </>
            );
          }}
        />
      </div>
      {errors[name] && (
        <div className="message">
          <span className="red">*</span> {errors[name].message}
        </div>
      )}
    </div>
  );
};

interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  id: string;
  name: string;
  label?: string;
  // TODO create the optional textarea render
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'phone'
    | 'button'
    | 'number'
    | 'date'
    | 'time'
    | 'textarea';
  min?: number;
  placeholder?: string;
  defaultValue?: unknown;
  errors?: UseFormStateReturn<FieldValues>['errors'];
  control: Control<FieldValues>;
  rules?: ControllerProps['rules'];
}

export default Input;
