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
    <div className="feedback-form-details1">
      <h2 className="card-header">Story #{subNumber}</h2>
      <div className="card-content">
        <div>
          <div className="submission-details">
            <Submission
              // title="Story #"
              // {...subNumber}
              submission={submission}
            />
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
