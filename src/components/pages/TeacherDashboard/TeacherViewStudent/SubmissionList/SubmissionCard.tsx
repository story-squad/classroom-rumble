import React from 'react';
import { Submissions } from '../../../../../api';

const SubmissionCard = ({
  score,
  prompt,
  src,
  codename,
}: Submissions.ISubItem): React.ReactElement => {
  return (
    <div className="submission-card">
      <h3>
        {codename} - {score}
      </h3>
      <img width="100" height="100" src={src} alt="" />
      <p>{prompt}</p>
    </div>
  );
};
export default SubmissionCard;
