import React, { useEffect, useState } from 'react';
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

  return (
    <div className="submission-list">
      {submissions.map((submission) => (
        <FeedbackSubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};

export default FeedbackSubmissionList;
