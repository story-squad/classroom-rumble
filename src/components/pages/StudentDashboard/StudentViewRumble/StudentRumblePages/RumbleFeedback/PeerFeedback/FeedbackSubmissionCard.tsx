import React from 'react';
import { useRecoilValue } from 'recoil';
import { IFeedbackQuestions } from '../../../../../../../api/Feedback';
import { feedbackQuestions } from '../../../../../../../config';
import { submissions } from '../../../../../../../state';
import { Submission } from '../../../../../../common';
import FeedbackForm from './FeedbackForm';

const FeedbackSubmissionCard = ({
  submissionId,
  subNumber,
  storyAmount,
}: IFeedbackSubmissionCardProps): React.ReactElement => {
  const submission = useRecoilValue(submissions.getById(submissionId));
  const questions: IFeedbackQuestions[] = feedbackQuestions;
  return submission ? (
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
  ) : (
    <p>Submission not found.</p>
  );
};

interface IFeedbackSubmissionCardProps {
  storyAmount: number;
  submissionId: number;
  subNumber: number;
}

export default FeedbackSubmissionCard;
