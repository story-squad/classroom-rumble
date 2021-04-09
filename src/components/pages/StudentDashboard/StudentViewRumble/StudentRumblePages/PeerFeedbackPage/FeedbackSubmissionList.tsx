import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { Submissions } from '../../../../../../api';
import { ISubItem } from '../../../../../../api/Submissions';
import { CouldNotLoad } from '../../../../../common/CouldNotLoad';
import { Loader } from '../../../../../common/Loader';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const FeedbackSubmissionList = (): React.ReactElement => {
  const [submissions, setSubmissions] = useState<ISubItem[]>();
  const [error, setError] = useState<null | string>(null);
  const { handleSubmit } = useFormContext();
  const { formState } = useForm();

  useEffect(() => {
    Submissions.getSubmissionsForFeedback()
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => {
        console.log({ err });
        setError('There are no user submissions for feedback.');
      });
  }, []);

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    console.log(data);
  };

  return submissions ? (
    <div className="submission-list">
      {submissions.map((submission, index) => (
        <FeedbackSubmissionCard
          key={submission.id}
          submission={submission}
          subNumber={index + 1}
        />
      ))}
      <button onClick={handleSubmit(onSubmit)} disabled={!formState.isValid}>
        Submit
      </button>
    </div>
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading feedback forms" />
  );
};

export default FeedbackSubmissionList;
