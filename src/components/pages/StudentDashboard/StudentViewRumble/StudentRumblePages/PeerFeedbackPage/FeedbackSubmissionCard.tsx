import React from 'react';
import { Submissions } from '../../../../../../api';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submission,
  subNumber,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  // TODO use victor's submission component
  return (
    <div>
      <h2>Feedback #{subNumber}</h2>
      <img
        aria-label="Handwritten Story"
        src={submission.src}
        width="200px"
        height="300px"
      />
      <a>View Larger Image</a>
      {/* modal to larger image */}
      <FeedbackForm subNumber={subNumber} />
    </div>
  );
};

interface IFeedbackSubmissionCardProps {
  submission: Submissions.ISubItem;
  subNumber: number;
}

export default FeedbackSubmissionCard;
