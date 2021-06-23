import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Feedback } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, feedback, rumbles } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import FeedbackComplete from './FeedbackComplete';
import { PeerFeedback } from './PeerFeedback';

const RumbleFeedbackContainer = (): React.ReactElement => {
  // State Subscriptions
  const user = useRecoilValue(auth.user);
  const rumble = useRecoilValue(rumbles.current);

  // Feedback Setters
  const addFeedback = useSetRecoilState(feedback.add);
  const [feedbackSubIds, setSubIdsForFeedback] = useRecoilState(
    feedback.getSubIdsByRumbleAndVoterId({
      rumbleId: rumble?.id,
      voterId: user?.id,
    }),
  );
  const feedbackComplete = useRecoilValue(feedback.hasSubmitted(user?.id));

  const [execute, loading, , error] = useAsync({
    asyncFunction: Feedback.getByVoterAndRumbleIds,
    setter: (fbList) => {
      console.log('FEEDBACK GET', fbList);
      const idlist = fbList.map((fb) => fb.submissionId);
      addFeedback(fbList);
      setSubIdsForFeedback(idlist);
    },
  });

  // This useEffect get the current user's feedback for OTHER submissions in the rumble
  useEffect(() => {
    if (user && rumble && !loading) {
      execute({ rumbleId: rumble.id, voterId: user.id });
    }
  }, [user, rumble]);

  console.log({
    rumble,
    user,
    feedbackSubIds,
    loading,
    error,
    feedbackComplete,
  });

  return feedbackComplete ? (
    <FeedbackComplete />
  ) : feedbackSubIds ? (
    <PeerFeedback />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading feedback" />
  );
};

export default RumbleFeedbackContainer;
