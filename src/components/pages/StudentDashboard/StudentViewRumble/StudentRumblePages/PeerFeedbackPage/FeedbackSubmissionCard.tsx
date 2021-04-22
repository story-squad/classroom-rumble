import React from 'react';
import { Submissions } from '../../../../../../api';
import { Submission } from '../../../../../common';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submission,
  subNumber,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  // TODO use victor's submission component
  return (
    <div className="feedback-form-details">
      <h2>Story #{subNumber}</h2>
      <div className="card-content">
        <div className="image-wrapper">
          <div className="image-container">
            <Submission submission={submission} />
          </div>
        </div>
        <div>
          <FeedbackForm subNumber={subNumber} />
        </div>
      </div>
    </div>
  );
};

interface IFeedbackSubmissionCardProps {
  submission: Submissions.ISubItem;
  subNumber: number;
}

export default FeedbackSubmissionCard;
