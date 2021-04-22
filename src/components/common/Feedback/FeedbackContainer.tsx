import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Feedback } from '../../../api';
import { current } from '../../../state';
import { Loader } from '../Loader';
import { IAverages } from './feedbackTypes';
import RenderFeedback from './RenderFeedback';

const FeedbackContainer = (): React.ReactElement => {
  const submission = useRecoilValue(current.sub);
  const [feedback, setFeedback] = useRecoilState(current.feedbackForSubmission);
  const [averages, setAverages] = useState<IAverages>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submission) {
      // To test remove rumble and student id from params and comment out the call in feedback.ts
      // uncomment and return dummydata then click on rumble
      Feedback.getSubmissionFeedback(submission.id)
        .then((res) => {
          setFeedback(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submission]);

  useEffect(() => {
    console.log({ feedback });
    if (!feedback || feedback.length <= 0) return;
    // This keeps this from breaking ^^
    const submissionScores = feedback.map(({ score1, score2, score3 }) => {
      // loops through the feedback array and pulls all the scores in to its own array
      return {
        score1: score1 ?? 0,
        score2: score2 ?? 0,
        score3: score3 ?? 0,
      };
    });
    const totals = submissionScores.reduce((acc, cur) => ({
      //totals all the scores up from the submissions array
      score1: acc.score1 + cur.score1,
      score2: acc.score2 + cur.score2,
      score3: acc.score3 + cur.score3,
    }));

    setAverages({
      // This averages all the scores and sets them to state
      score1: parseFloat((totals.score1 / feedback.length).toFixed(2)),
      score2: parseFloat((totals.score2 / feedback.length).toFixed(2)),
      score3: parseFloat((totals.score3 / feedback.length).toFixed(2)),
    });
  }, [feedback]);

  return loading ? <Loader /> : <RenderFeedback averages={averages} />;
};

export default FeedbackContainer;