import React from 'react';
import { useRecoilValue } from 'recoil';
import { auth, rumbles } from '../../../../../../state';
import { StudentSubmissionPage } from './StudentSubmissionPage';
import SubmissionSuccess from './SubmissionSuccess';

const RumbleActiveContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.current);
  const user = useRecoilValue(auth.user);
  const hasSubmitted = useRecoilValue(
    rumbles.userHasSubmitted({ rumbleId: rumble?.id, userId: user?.id }),
  );

  return hasSubmitted ? <SubmissionSuccess /> : <StudentSubmissionPage />;
};

export default RumbleActiveContainer;
