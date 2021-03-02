import React from 'react';
import { Submissions } from '../../../../../api';

const SubmissionCard = ({
  score,
}: Submissions.ISubmission): React.ReactElement => {
  return (
    <div className="submission-card">
      <h3>{score}</h3>
    </div>
  );
};
export default SubmissionCard;
