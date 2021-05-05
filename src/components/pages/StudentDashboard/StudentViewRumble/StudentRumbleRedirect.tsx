import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Feedback, Rumbles, Sections, Students } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { auth, current } from '../../../../state';
import { Loader } from '../../../common';
import {
  PastRumbleDetails,
  PeerFeedbackPage,
  SubmissionSuccess,
} from './StudentRumblePages';
import { StudentSubmissionPage } from './StudentRumblePages/';

const StudentRumbleRedirect = ({
  rumble,
  section,
}: IStudentRumbleRedirectProps): React.ReactElement => {
  // The currently logged in user
  const user = useRecoilValue(auth.user);
  // The user's submission for the rumble they clicked on
  const [submission, setSubmission] = useRecoilState(current.sub);
  // Whether or not the user has given feedback to others yet
  const [feedbackComplete, setFeedbackComplete] = useState<boolean>();
  // const [loading, setLoading] = useState(true);

  const hasSubmitted = useRecoilValue(current.hasSubmitted);

  const [getSubForRumble, loading, ,] = useAsync({
    asyncFunction: Students.getSubForRumble,
    setter: setSubmission,
  });

  // This useEffect is loading the current user's submission for the rumble
  useEffect(() => {
    if (rumble && user && !submission) {
      getSubForRumble(rumble.id, user.id);
    }
    return () => setSubmission(undefined);
  }, [rumble, user]);

  const [checkIfHasSubmittedFeedback, , ,] = useAsync({
    asyncFunction: Feedback.checkIfHasSubmittedFeedback,
    setter: setFeedbackComplete,
  });

  // This useEffect get the current user's feedback for OTHER submissions in the rumble
  useEffect(() => {
    if (submission && user) {
      checkIfHasSubmittedFeedback({
        rumbleId: rumble.id,
        studentId: user.id,
      });
    }
  }, [submission]);

  return loading ? (
    <Loader />
  ) : hasSubmitted ? (
    <SubmissionSuccess />
  ) : !submission ? (
    // If the student has not submitted, show the rumble page
    // TODO do a separate post endpoint for late work
    <StudentSubmissionPage rumble={rumble} section={section} />
  ) : feedbackComplete === false ? (
    <PeerFeedbackPage />
  ) : (
    <PastRumbleDetails />
  );
};

interface IStudentRumbleRedirectProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
  endTime: Date;
}

export default StudentRumbleRedirect;
