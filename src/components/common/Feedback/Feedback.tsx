import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Table } from '..';
import { Feedback } from '../../../api';
import { auth, current } from '../../../state';

const RenderFeedback = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const student = useRecoilValue(auth.user);
  const [feedback, setFeedback] = useState<Feedback.IFeedback[]>();
  const [averages, setAverages] = useState<{
    score1: number;
    score2: number;
    score3: number;
  }>();

  useEffect(() => {
    if (rumble?.id && student?.id) {
      // To test remove rumble and student id from params and comment out the call in feedback.ts
      // uncomment and return dummydata then click on rumble
      Feedback.getSubmissionFeedback(rumble.id, student.id)

        .then((res) => {
          setFeedback(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rumble, student]);
  console.log(feedback?.length);
  useEffect(() => {
    if (feedback?.length) {
      if (feedback.length > 0) return;
      const submissionScores = feedback.map(({ score1, score2, score3 }) => {
        return {
          score1: score1 ?? 0,
          score2: score2 ?? 0,
          score3: score3 ?? 0,
        };
      });
      const totals = submissionScores.reduce((acc, cur) => ({
        score1: acc.score1 + cur.score1,
        score2: acc.score2 + cur.score2,
        score3: acc.score3 + cur.score3,
      }));

      setAverages({
        score1: parseFloat((totals.score1 / feedback.length).toFixed(2)),
        score2: parseFloat((totals.score2 / feedback.length).toFixed(2)),
        score3: parseFloat((totals.score3 / feedback.length).toFixed(2)),
      });
    }
  }, [feedback]);

  return (
    <div className="feedback-wrapper">
      <h2>FEEDBACK</h2>
      {feedback && averages ? (
        <div className="feedback-container">
          <Table.Header>
            <Table.Col>Questions</Table.Col>
            <Table.Col>Rating out of 5</Table.Col>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Col>1. Is this the first question?</Table.Col>
              <Table.Col>{averages.score1}</Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col>2. Is this the second question?</Table.Col>
              <Table.Col>{averages.score2}</Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col>3. Is this the third question?</Table.Col>
              <Table.Col>{averages.score3}</Table.Col>
            </Table.Row>
          </Table.Body>
        </div>
      ) : (
        <div className="message">
          <p>You have not recieved any feedback yet.</p>
          <p>Please Wait!</p>
        </div>
      )}
    </div>
  );
};

export default RenderFeedback;
