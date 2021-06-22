import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Feedback, Submissions } from '../../../api';
import { useAsync } from '../../../hooks';
import { feedback, submissions } from '../../../state';
import { Loader } from '../Loader';
import RenderFeedback from './RenderFeedback';

const FeedbackContainer = ({
  submissionId,
}: IFeedbackContainerProps): React.ReactElement => {
  const [submission, updateSubmission] = useRecoilState(
    submissions.getById(submissionId),
  );
  const feedbackIds = useRecoilValue(feedback.getIdsBySubId(submissionId));
  const averages = useRecoilValue(feedback.averages(feedbackIds));
  const addFeedback = useSetRecoilState(feedback.add);

  const [getSubmissionFeedback, loading, ,] = useAsync({
    asyncFunction: Feedback.getSubmissionFeedback,
    setter: addFeedback,
  });

  const [getSub, subLoading] = useAsync({
    asyncFunction: Submissions.get,
    setter: ([subFromAPI]) => updateSubmission(subFromAPI),
  });

  useEffect(() => {
    if (submission && !loading) {
      getSubmissionFeedback(submission.id);
    } else if (!subLoading) {
      getSub({ ids: [submissionId] });
    }
  }, [submission]);

  return loading ? (
    <Loader />
  ) : subLoading ? (
    <Loader message="Loading submission" />
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
