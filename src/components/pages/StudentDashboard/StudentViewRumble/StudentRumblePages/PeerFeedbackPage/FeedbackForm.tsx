import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RadioGroup } from '../../../../../common/RadioGroup/index';

const FeedbackForm = ({
  subNumber,
}: IFeedbackFormProps): React.ReactElement => {
  const { register, errors } = useFormContext();

  const radioRange = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];
  return (
    <div className="radio-button-section">
      <h2 className="form-header">FEEDBACK</h2>
      <div>
        <div className="radio-wrapper">
          <p className="form-questions">
            How much did you want the main characters to succeed?
          </p>
          <div className="radios">
            <RadioGroup
              name={`Submission${subNumber}-Q1`}
              register={register}
              options={radioRange}
              rules={{ required: 'Please choose a value from 1-5!' }}
              errors={errors}
            />
            <div className="footer-section">
              <p>Not at all</p>
              <p>A lot</p>
            </div>
          </div>
        </div>
        <div className="radio-wrapper">
          <p className="form-questions">
            How interested were you in finding out what happens in the story?
          </p>

          <div className="radios">
            <RadioGroup
              name={`Submission${subNumber}-Q2`}
              register={register}
              options={radioRange}
              rules={{ required: 'Please choose a value from 1-5!' }}
              errors={errors}
            />
            <div className="footer-section">
              <p>Not interested</p>
              <p>Very interested</p>
            </div>
          </div>
        </div>
        <div className="radio-wrapper">
          <p className="form-questions">
            How easily did the descriptions allow you to imagine the setting and
            action?
          </p>
          <div className="radios">
            <RadioGroup
              name={`Submission${subNumber}-Q3`}
              register={register}
              options={radioRange}
              rules={{ required: 'Please choose a value from 1-5!' }}
              errors={errors}
            />
            <div className="footer-section">
              <p>Not easily</p>
              <p>Very easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IFeedbackFormProps {
  subNumber: number;
}

export default FeedbackForm;
