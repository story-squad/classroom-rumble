import React from 'react';
import { Submissions } from '../../../../../../api';
import { IFeedbackQuestions } from '../../../../../../api/Feedback';
import { feedbackQuestions } from '../../../../../../config';
import { Submission } from '../../../../../common';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submission,
  subNumber,
  storyAmount,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  const questions: IFeedbackQuestions[] = feedbackQuestions;
  return (
    <div className="feedback-submission-card">
      <div className="card-content">
        <Submission
          title={`Story ${subNumber} of ${storyAmount}`}
          submission={submission}
        />
        <div className="feedback-questions-section">
          <h2 className="form-header">FEEDBACK</h2>
          {questions.map((question, index) => (
            <FeedbackForm
              key={index}
              subNumber={subNumber}
              question={question}
              questionNumber={index + 1}
            />
          ))}
        </div>
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
