import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Feedback, Rumbles, Sections, Students } from '../../../../api';
import { auth, current } from '../../../../state';
import { Loader } from '../../../common';
import { PastRumbleDetails, PeerFeedbackPage } from './StudentRumblePages';
import { StudentSubmissionPage } from './StudentRumblePages/';

const StudentRumbleRedirect = ({
  endTime,
  rumble,
  section,
}: IStudentRumbleRedirectProps): React.ReactElement => {
  // The currently logged in user
  const user = useRecoilValue(auth.user);
  // The user's submission for the rumble they clicked on
  const [submission, setSubmission] = useRecoilState(current.sub);
  // Feedback given TO the user's submission
  const [feedbackForSub, setFeedbackForSub] = useRecoilState(
    current.feedbackForSubmission,
  );
  // Feedback that the user has given to OTHERS in the rumble
  const [feedback, setFeedback] = useState<Feedback.IFeedback[]>();
  // Whether or not the user has given feedback to others yet
  const [feedbackComplete, setFeedbackComplete] = useState<boolean>();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  // This useEffect is loading the current user's submission for the rumble
  useEffect(() => {
    if (rumble && user && !submission) {
      Students.getSubForRumble(rumble.id, user.id)
        .then((res) => {
          console.log('subs for rumble', { res });
          // Set loading to false, submission will also be false, so the
          // student submission page will be rendered
          if (res === undefined) setLoading(false);
          // If submission is defined after this, it will run the next useEffect
          setSubmission(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('There is no submission for this Rumble.');
        });
    }
    return () => setSubmission(undefined);
  }, [rumble, user]);

  // This useEffect get the current user's feedback for OTHER submissions in the rumble
  useEffect(() => {
    if (submission && user) {
      Feedback.checkIfHasSubmittedFeedback({
        rumbleId: rumble.id,
        studentId: user.id,
      })
        .then((res) => {
          console.log('has submitted', { res });
          // If the user has not submitted feedback, stop loading and display feedback form
          if (res === false) setLoading(false);
          setFeedbackComplete(res);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [submission]);

  //
  useEffect(() => {
    if (submission) {
      // When submission is successfully set,
      Feedback.getSubmissionFeedback(submission.id)
        .then((res) => {
          console.log('sub feedbac', { res });
          setFeedbackForSub(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [submission]);

  return loading ? (
    <Loader />
  ) : !submission ? (
    // If the student has not submitted, show the rumble page
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

const isRumbleEnded = (endTime: string) =>
  DateTime.fromISO(endTime) <= DateTime.now();

export default StudentRumbleRedirect;
