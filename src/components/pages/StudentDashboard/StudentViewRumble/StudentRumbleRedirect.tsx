import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Feedback, Rumbles, Sections, Students } from '../../../../api';
import { app, auth, submissions } from '../../../../state';
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
  const submission = useRecoilValue(submissions.current);
  const addSubmissions = useSetRecoilState(submissions.add);
  // Whether or not the user has given feedback to others yet
  const [feedbackComplete, setFeedbackComplete] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const [hasSubmitted, setHasSubmitted] = useRecoilState(app.hasSubmitted);

  // This useEffect loads on page render.
  // hasSubmitted is set to false until conditions are met.
  useEffect(() => {
    setHasSubmitted(false);
  }, []);

  // This useEffect is loading the current user's submission for the rumble
  useEffect(() => {
    if (rumble && user && !submission) {
      setLoading(true);
      Students.getSubForRumble(rumble.id, user.id)
        .then((res) => {
          // Set loading to false, submission will also be false, so the
          // student submission page will be rendered
          if (res === undefined) setLoading(false);
          else setHasSubmitted(true);
          // If submission is defined after this, it will run the next useEffect
          addSubmissions(res);
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
      Feedback.checkIfHasSubmittedFeedback({
        rumbleId: rumble.id,
        studentId: user.id,
      })
        .then((res) => {
          console.log('has submitted feedback', { res });
          // If the user has not submitted feedback, stop loading and display feedback form
          if (res === false) setLoading(false);
          setFeedbackComplete(res);
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [submission]);

  return loading ? (
    <Loader />
  ) : hasSubmitted && rumble.phase === `ACTIVE` ? (
    <SubmissionSuccess />
  ) : !submission ? (
    // If the student has not submitted, show the rumble page
    // TODO do a separate post endpoint for late work
    <StudentSubmissionPage sectionId={section.id} />
  ) : feedbackComplete === false ? (
    <PeerFeedbackPage />
  ) : (
    <PastRumbleDetails />
  );
};

interface IStudentRumbleRedirectProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default StudentRumbleRedirect;
