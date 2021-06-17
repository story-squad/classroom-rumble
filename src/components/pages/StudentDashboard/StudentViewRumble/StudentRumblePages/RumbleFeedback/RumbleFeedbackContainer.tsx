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
  const feedbackComplete = useRecoilValue(
    feedback.hasSubmitted({
      rumbleId: rumble?.id,
      voterId: user?.id,
    }),
  );

  const [execute, loading, , error] = useAsync({
    asyncFunction: Feedback.getByVoterAndRumbleIds,
    setter: (fbList) => {
      const idlist = fbList.map((fb) => fb.submissionId);
      console.log('feedback GET', fbList, idlist, rumble, user);
      addFeedback(fbList);
      setSubIdsForFeedback(idlist);
    },
  });

  // This useEffect get the current user's feedback for OTHER submissions in the rumble
  useEffect(() => {
    if (user && rumble && !loading && !feedbackSubIds) {
      execute({ rumbleId: rumble.id, voterId: user.id });
    }
  }, [user, rumble]);

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
