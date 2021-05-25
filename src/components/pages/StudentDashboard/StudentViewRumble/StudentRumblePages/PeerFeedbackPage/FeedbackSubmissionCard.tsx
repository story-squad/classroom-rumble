import React from 'react';
import { Submissions } from '../../../../../../api';
import { feedbackQuestions } from '../../../../../../config';
import { Submission } from '../../../../../common';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submission,
  subNumber,
  storyAmount,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  return (
    <div className="feedback-submission-card">
      <div className="card-content">
        <Submission
          title={`Story ${subNumber} of ${storyAmount}`}
          submission={submission}
        />
        <h2 className="form-header">FEEDBACK</h2>
        {feedbackQuestions.map((question, index) => (
          <FeedbackForm
            key={index}
            subNumber={subNumber}
            question={question}
            questionNumber={index + 1}
          />
        ))}
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
