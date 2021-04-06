import React from 'react';
import { useFormContext } from 'react-hook-form';

const FeedbackForm = ({
  subNumber,
}: IFeedbackFormProps): React.ReactElement => {
  const { register } = useFormContext();
  return (
    <div>
      <h2>FEEDBACK</h2>
      <form>
        <div>
          <p>How much did you want the main characters to succeed?</p>
          <label>1</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q1`}
            value="1"
            ref={register}
          />
          <label>2</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q1`}
            value="2"
            ref={register}
          />
          <label>3</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q1`}
            value="3"
            ref={register}
          />
          <label>4</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q1`}
            value="4"
            ref={register}
          />
          <label>5</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q1`}
            value="5"
            ref={register}
          />
        </div>
        <div>
          <p>
            How interested were you in finding out what happens in the Story?
          </p>
          <label>1</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q2`}
            value="1"
            ref={register}
          />
          <label>2</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q2`}
            value="2"
            ref={register}
          />
          <label>3</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q2`}
            value="3"
            ref={register}
          />
          <label>4</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q2`}
            value="4"
            ref={register}
          />
          <label>5</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q2`}
            value="5"
            ref={register}
          />
        </div>
        <div>
          <p>
            How easily did the descriptions allow you to imagine the setting and
            action?
          </p>
          <label>1</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q3`}
            value="1"
            ref={register}
          />
          <label>2</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q3`}
            value="2"
            ref={register}
          />
          <label>3</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q3`}
            value="3"
            ref={register}
          />
          <label>4</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q3`}
            value="4"
            ref={register}
          />
          <label>5</label>
          <input
            type="radio"
            name={`Story${subNumber}-Q3`}
            value="5"
            ref={register}
          />
        </div>
      </form>
    </div>
  );
};

interface IFeedbackFormProps {
  subNumber: number;
}

export default FeedbackForm;
