import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Feedback } from '../../../../../../../api';
import { RadioGroup } from '../../../../../../common/RadioGroup/index';

const FeedbackForm = ({
  subNumber,
  question,
  questionNumber,
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
      <div className="radio-wrapper">
        <p className="form-questions">{question.question}</p>
        <div className="radios">
          <RadioGroup
            name={`Submission${subNumber}-Q${questionNumber}`}
            register={register}
            options={radioRange}
            rules={{ required: 'Please choose a value from 1-5!' }}
            errors={errors}
          />
          <div className="footer-section">
            <p>{question.lowLabel}</p>
            <p>{question.highLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IFeedbackFormProps {
  subNumber: number;
  question: Feedback.IFeedbackQuestions;
  questionNumber: number;
}

export default FeedbackForm;
