import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, current } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const user = useRecoilValue(auth.user);
  const [submissions, setSubmissions] = useState<Submissions.ISubItem[]>();

  const [getSubmissionsForFeedback, , , error] = useAsync({
    asyncFunction: Submissions.getSubmissionsForFeedback,
    setter: setSubmissions,
  });

  useEffect(() => {
    if (rumble && user) {
      getSubmissionsForFeedback(rumble.id, user.id);
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
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
