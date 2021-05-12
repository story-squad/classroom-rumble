import React from 'react';
import { Table } from '..';
import { Submissions } from '../../../api';
import { Submission } from '../Submission';
import { IAverages } from './feedbackTypes';

const RenderFeedback = ({
  submission,
  averages,
}: IRenderFeedbackProps): React.ReactElement => {
  return (
    <div className="feedback-wrapper">
      <div className="feedback-content-wrapper">
        <Submission title="Submission" submission={submission} />
        {averages ? (
          // If there are no averages show that there is no feedback yet else show the table with feedback
          <div className="feedback-container">
            <h2>FEEDBACK</h2>
            {/* <Table.Header>
              <Table.Col>Questions</Table.Col>
              <Table.Col>Rating out of 5</Table.Col>
            </Table.Header> */}
            <Table.Body>
              <Table.Row>
                <Table.Col>1. Is this the first question?</Table.Col>
                <Table.Col>{averages.score1} out of 5</Table.Col>
              </Table.Row>
              <Table.Row>
                <Table.Col>2. Is this the second question?</Table.Col>
                <Table.Col>{averages.score2} out of 5</Table.Col>
              </Table.Row>
              <Table.Row>
                <Table.Col>3. Is this the third question?</Table.Col>
                <Table.Col>{averages.score3} out of 5</Table.Col>
              </Table.Row>
            </Table.Body>
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
