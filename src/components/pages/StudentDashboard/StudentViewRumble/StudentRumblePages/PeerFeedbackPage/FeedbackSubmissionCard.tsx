import React from 'react';
import { Submissions } from '../../../../../../api';

const FeedbackSubmissionCard = ({
  submission,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  return (
    <div>
      <div>
        <img src={submission.src}></img>
        <a>View Larger Image</a>
        {/* modal to larger image */}
      </div>
      <form>
        <h2>FEEDBACK</h2>
        <label>
          How much did you want the main characters to succeed?
          <input type="radio"></input>
        </label>
      </form>
    </div>
  );
};

interface IFeedbackSubmissionCardProps {
  submission: Submissions.ISubItem;
}

export default FeedbackSubmissionCard;
