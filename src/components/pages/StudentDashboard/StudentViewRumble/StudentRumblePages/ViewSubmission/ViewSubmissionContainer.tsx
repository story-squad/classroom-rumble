import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Students } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, current } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPastRumbleDetails from './RenderViewSubmission';

const PastRumbleDetailsContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(current.section);
  const [submission, setSubmission] = useRecoilState(current.sub);

  const [getSubForRumble, , , error] = useAsync({
    asyncFunction: Students.getSubForRumble,
    setter: setSubmission,
  });

  useEffect(() => {
    if (rumble && user && !submission) {
      getSubForRumble(rumble.id, user.id);
    }
  }, [rumble, user]);

  return submission && section ? (
    <RenderPastRumbleDetails section={section} submission={submission} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Submission'} />
  );
};

export default PastRumbleDetailsContainer;
