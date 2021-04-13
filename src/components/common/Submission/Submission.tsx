import React from 'react';
import { Submissions } from '../../../api';

const Submission = ({ submission }: ISubmissionProps): React.ReactElement => {
  return (
    <div className="image-wrapper">
      <div className="image-container">
        <img src={submission.src} />
      </div>
    </div>
  );
};
// ToDO add fullscreen view on click
interface ISubmissionProps {
  submission: Submissions.ISubItem;
}

export default Submission;
