import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Feedback } from '../../../api';
import { useAsync } from '../../../hooks';
import { feedback, submissions } from '../../../state';
import { Loader } from '../Loader';
import RenderFeedback from './RenderFeedback';

const FeedbackContainer = ({
  submissionId,
}: IFeedbackContainerProps): React.ReactElement => {
  const submission = useRecoilValue(submissions.getById(submissionId));
  const [feedbackIds, setFeedback] = useRecoilState(feedback.ids);
  const averages = useRecoilValue(feedback.averages(feedbackIds));

  const [getSubmissionFeedback, loading, ,] = useAsync({
    asyncFunction: Feedback.getSubmissionFeedback,
    setter: (f) => {
      setFeedback(f.map((fb) => fb.id));
    },
  });

  useEffect(() => {
    if (submission) {
      getSubmissionFeedback(submission.id);
    }
  }, [submission]);

  return loading ? (
    <Loader />
  ) : submission ? (
    <RenderFeedback averages={averages} submission={submission} />
  ) : (
    <p>Could not find submission</p>
  );
};

interface IFeedbackContainerProps {
  submissionId: number;
}

export default FeedbackContainer;
