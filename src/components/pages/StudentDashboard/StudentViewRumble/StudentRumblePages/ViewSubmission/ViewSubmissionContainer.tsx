import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Students } from '../../../../../../api';
import { auth, current } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPastRumbleDetails from './RenderViewSubmission';

const PastRumbleDetailsContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(current.section);
  const [submission, setSubmission] = useRecoilState(current.sub);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (rumble && user && !submission) {
      Students.getSubForRumble(rumble.id, user.id)
        .then((res) => {
          // console.log(res);
          setSubmission(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('There is no submission for this Rumble.');
        });
    }
  }, [rumble, user]);

  return submission && section ? (
    <RenderPastRumbleDetails section={section} submission={submission} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message={'Loading Submission'} />
  );
};

export default PastRumbleDetailsContainer;
