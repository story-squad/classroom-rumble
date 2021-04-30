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
    <div className="feedback-submission-card">
      <h2>{`Story #${subNumber}`}</h2>
      <div className="card-content">
        <Submission
          // title="Story #"
          // {...subNumber}
          submission={submission}
        />
        <FeedbackForm subNumber={subNumber} />
      </div>
    </div>
  );
};

interface IFeedbackSubmissionCardProps {
  submission: Submissions.ISubItem;
  subNumber: number;
}

export default FeedbackSubmissionCard;
