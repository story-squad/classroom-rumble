import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../../api';
import { auth, current } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const user = useRecoilValue(auth.user);
  const [error, setError] = useState<null | string>(null);
  const [submissions, setSubmissions] = useState<Submissions.ISubItem[]>();

  useEffect(() => {
    console.log({ rumble, user });
    if (rumble && user) {
      Submissions.getSubmissionsForFeedback(rumble.id, user.id) // Use for real API call
        .then((res) => {
          console.log('subs for fe4edback', { res });
          setSubmissions(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('There are no user submissions for feedback.');
        });
    }
  }, [rumble, user]);

  // TODO no feedback display line 39
  return section && submissions && user ? (
    <RenderPeerFeedback
      section={section}
      submissions={submissions}
      student={user}
    />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
