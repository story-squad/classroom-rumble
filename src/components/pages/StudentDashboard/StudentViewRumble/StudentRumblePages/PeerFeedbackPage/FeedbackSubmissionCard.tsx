import React from 'react';
import { Submissions } from '../../../../../../api';
import { Submission } from '../../../../../common';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submission,
  subNumber,
  storyAmount,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  // TODO use victor's submission component
  return (
    <div className="feedback-submission-card">
      <div className="card-content">
        <Submission
          title={`Story ${subNumber} of ${storyAmount}`}
          submission={submission}
        />
        <FeedbackForm subNumber={subNumber} />
      </div>
    </div>
  );
};

interface IFeedbackSubmissionCardProps {
  storyAmount: number;
  submission: Submissions.ISubItem;
  subNumber: number;
}

export default FeedbackSubmissionCard;
