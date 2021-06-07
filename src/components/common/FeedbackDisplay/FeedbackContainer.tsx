import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Feedback, Submissions } from '../../../api';
import { useAsync } from '../../../hooks';
import { current } from '../../../state';
import { Loader } from '../Loader';
import { IAverages } from './feedbackTypes';
import RenderFeedback from './RenderFeedback';

const FeedbackContainer = ({
  submission,
}: IFeedbackContainerProps): React.ReactElement => {
  const [feedback, setFeedback] = useRecoilState(current.feedbackForSubmission);
  const [averages, setAverages] = useState<IAverages>();

  const [getSubmissionFeedback, loading, ,] = useAsync({
    asyncFunction: Feedback.getSubmissionFeedback,
    setter: setFeedback,
  });

  useEffect(() => {
    if (submission) {
      getSubmissionFeedback(submission.id);
    }
  }, [submission]);

  useEffect(() => {
    if (!feedback || feedback.length <= 0) return;

    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    const count = [0, 0, 0];

    feedback.forEach((fb) => {
      if (!fb) return;
      else {
        if (fb.score1 && fb.score1 > 0) {
          score1 += fb.score1;
          count[0]++;
        }
        if (fb.score2 && fb.score2 > 0) {
          score2 += fb.score2;
          count[1]++;
        }
        if (fb.score3 && fb.score3 > 0) {
          score3 += fb.score3;
          count[2]++;
        }
      }
    });

    score1 /= count[0];
    score2 /= count[1];
    score3 /= count[2];

    setAverages({
      score1: parseFloat(score1.toFixed(2)),
      score2: parseFloat(score2.toFixed(2)),
      score3: parseFloat(score3.toFixed(2)),
    });
  }, [feedback]);

  return loading ? (
    <Loader />
  ) : (
    <RenderFeedback averages={averages} submission={submission} />
  );
};

interface IFeedbackContainerProps {
  submission: Submissions.ISubItem;
}

export default FeedbackContainer;
