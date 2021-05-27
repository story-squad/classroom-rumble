import React from 'react';
import { Table } from '..';
import { Feedback, Submissions } from '../../../api';
import { feedbackQuestions } from '../../../config';
import { Submission } from '../Submission';
import { IAverages } from './feedbackTypes';

const RenderFeedback = ({
  submission,
  averages,
}: IRenderFeedbackProps): React.ReactElement => {
  const questions: Feedback.IFeedbackQuestions[] = feedbackQuestions;
  return (
    <div className="feedback-wrapper">
      <div className="feedback-content-wrapper">
        <Submission title="Submission" submission={submission} />
        {averages ? (
          // If there are no averages show that there is no feedback yet else show the table with feedback
          <div className="feedback-container">
            <h2>FEEDBACK</h2>
            <div className="table-wrapper">
              <Table.Header>
                <Table.Col className="header-question">Question</Table.Col>
                <Table.Col className="header-score">
                  Rating out&nbsp;of&nbsp;5
                </Table.Col>
              </Table.Header>
              {questions.map((question, index) => (
                <Table.Body key={index}>
                  <Table.Row>
                    <Table.Col className="feedback-question">
                      {`${index + 1}. ` + question.question}
                    </Table.Col>
                    <Table.Col className="feedback-score">
                      {averages[`score${index + 1}` as keyof typeof averages]}{' '}
                      out&nbsp;of&nbsp;5
                    </Table.Col>
                  </Table.Row>
                </Table.Body>
              ))}
            </div>
          </div>
        ) : (
          <div className="message">
            <h2>Feedback</h2>
            <p>You have not recieved any feedback yet.</p>
            <p>Please Wait!</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface IRenderFeedbackProps {
  averages?: IAverages;
  submission: Submissions.ISubItem;
}

export default RenderFeedback;
