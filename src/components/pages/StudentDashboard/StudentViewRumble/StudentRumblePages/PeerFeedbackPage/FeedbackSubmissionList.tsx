import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { Submissions } from '../../../../../../api';
import { ISubItem } from '../../../../../../api/Submissions';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const FeedbackSubmissionList = (): React.ReactElement => {
  const [submissions, setSubmissions] = useState<ISubItem[]>([]);
  useEffect(() => {
    Submissions.getSubmissionsForFeedback()
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const { handleSubmit } = useFormContext();
  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) =>
    console.log(data);

  return (
    <div className="submission-list">
      {submissions.map((submission, index) => (
        <FeedbackSubmissionCard
          key={submission.id}
          submission={submission}
          subNumber={index + 1}
        />
      ))}
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
      {/* Validation? */}
    </div>
  );
};

export default FeedbackSubmissionList;
