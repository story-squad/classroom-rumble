import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Feedback } from '../../../api';
import { auth, current } from '../../../state';

const RenderFeedback = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const student = useRecoilValue(auth.user);
  const [feedback, setFeedback] = useState<Feedback.IFeedback[]>();
  // Is making these state neccesary?

  const [averages, setAverages] = useState<{
    score1: number;
    score2: number;
    score3: number;
  }>();
  //  *** ^^^^ ***

  useEffect(() => {
    if (rumble?.id && student?.id) {
      // To test remove rumble and student id from params and comment out the call in feedback.ts
      // uncomment and return dummydata then click on rumble
      Feedback.getSubmissionFeedback()

        .then((res) => {
          setFeedback(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rumble, student]);

  useEffect(() => {
    if (!feedback) return;
    const submissionScores = feedback.map(({ score1, score2, score3 }) => {
      return { score1: score1 ?? 0, score2: score2 ?? 0, score3: score3 ?? 0 };
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

    console.log('Totals', averages);
  }, [feedback]);

  return (
    <div className="feedback-wrapper">
      <h2>Hey I am Feedback</h2>
      {averages && (
        <>
          <div>{averages.score1}</div>
          <div>{averages.score2}</div>
          <div>{averages.score3}</div>
        </>
      )}
    </div>
  );
};

export default RenderFeedback;
