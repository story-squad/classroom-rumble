import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, rumbles, sections, submissions } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const currentSection = useRecoilValue(sections.selected);
  const currentRumble = useRecoilValue(rumbles.selected);
  const user = useRecoilValue(auth.user);
  const addSubmissions = useSetRecoilState(submissions.add);

  const [getSubmissionsForFeedback, , , error] = useAsync({
    asyncFunction: Submissions.getSubmissionsForFeedback,
    setter: addSubmissions,
  });

  useEffect(() => {
    if (currentRumble && user) {
      getSubmissionsForFeedback(currentRumble, user.id);
    }
  }, [currentRumble, user]);

  // TODO no feedback display line 39
  return currentSection && submissions && user ? (
    <RenderPeerFeedback sectionId={currentSection} student={user} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
