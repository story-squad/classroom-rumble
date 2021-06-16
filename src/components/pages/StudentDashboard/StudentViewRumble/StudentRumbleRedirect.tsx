import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Feedback, Rumbles, Sections, Students } from '../../../../api';
import { auth, feedback, rumbles, submissions } from '../../../../state';
import { Loader } from '../../../common';
import {
  PastRumbleDetails,
  PeerFeedbackPage,
  RumbleComplete,
  StudentSubmissionPage,
  SubmissionSuccess,
  WaitingRoom,
} from './StudentRumblePages';

const StudentRumbleRedirect = ({
  rumble,
  section,
}: IStudentRumbleRedirectProps): React.ReactElement => {
  // The currently logged in user
  const user = useRecoilValue(auth.user);
  // The user's submission for the rumble they clicked on
  const submission = useRecoilValue(submissions.current);
  const addSubmissions = useSetRecoilState(submissions.add);
  const addFeedback = useSetRecoilState(feedback.add);
  const [loading, setLoading] = useState(true);
  const setSubIdForRumble = useSetRecoilState(
    submissions.getIdByRumbleAndUser({
      rumbleId: rumble.id,
      userId: user?.id,
    }),
  );
  const setSubIdsForFeedback = useSetRecoilState(
    feedback.getSubIdsByRumbleAndVoterId({
      rumbleId: rumble.id,
      voterId: user?.id,
    }),
  );
  const hasSubmitted = useRecoilValue(
    rumbles.userHasSubmitted({ rumbleId: rumble.id, userId: user?.id }),
  );
  const feedbackComplete = useRecoilValue(
    feedback.hasSubmitted({
      rumbleId: rumble.id,
      voterId: user?.id,
    }),
  );

  useEffect(() =>
    console.log('rumble redirect', {
      rumble,
      section,
      submission,
      feedbackComplete,
      hasSubmitted,
    }),
  );

  // This useEffect is loading the current user's submission for the rumble
  useEffect(() => {
    if (rumble && user && !submission) {
      setLoading(true);
      Students.getSubForRumble(rumble.id, user.id)
        .then((res) => {
          addSubmissions(res);
          setSubIdForRumble(res?.id);
        })
        .catch((err) => {
          console.log({ err });
          // setError('There is no submission for this Rumble.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [rumble, user]);

  // This useEffect get the current user's feedback for OTHER submissions in the rumble
  useEffect(() => {
    if (submission && user) {
      setLoading(true);
      Feedback.getByVoterAndRumbleIds({
        rumbleId: rumble.id,
        voterId: user.id,
      })
        .then((fbList) => {
          const idlist = fbList.map((fb) => fb.id);
          console.log('feedback GET', fbList, idlist, rumble, user);
          addFeedback(fbList);
          setSubIdsForFeedback(idlist);
        })
        .catch((err) => {
          console.log({ err });
          // setError('There is no submission for this Rumble.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submission]);

  const render = useMemo(() => {
    if (rumble.phase === 'COMPLETE') {
      return <PastRumbleDetails />;
    } else if (rumble.phase === 'FEEDBACK') {
      if (loading) {
        return <Loader />;
      } else if (feedbackComplete) {
        return <RumbleComplete />;
      } else {
        return <PeerFeedbackPage />;
      }
    } else if (rumble.phase === 'ACTIVE') {
      // This is where we render based on submission status
      if (loading) {
        return <Loader />;
      } else if (hasSubmitted) {
        return <SubmissionSuccess />;
      } else {
        return <StudentSubmissionPage sectionId={section.id} />;
      }
    } else {
      // Inactive
      return <WaitingRoom />;
    }
  }, [
    loading,
    submission,
    section,
    hasSubmitted,
    rumble,
    feedbackComplete,
    rumble,
  ]);

  return render;
};

interface IStudentRumbleRedirectProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default StudentRumbleRedirect;
