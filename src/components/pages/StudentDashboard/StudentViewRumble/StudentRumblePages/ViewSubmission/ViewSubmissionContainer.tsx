import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Students } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, rumbles, sections, submissions } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPastRumbleDetails from './RenderViewSubmission';

const PastRumbleDetailsContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.current);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(sections.current);
  const submission = useRecoilValue(submissions.current);
  const addSubmissions = useSetRecoilState(submissions.add);

  const [getSubForRumble, , , error] = useAsync({
    asyncFunction: Students.getSubForRumble,
    setter: addSubmissions,
  });

  useEffect(() => {
    if (rumble && user && !submission) {
      getSubForRumble(rumble.id, user.id);
    }
  }, [rumble, user]);

  return submission && section ? (
    <RenderPastRumbleDetails
      sectionId={section.id}
      submissionId={submission.id}
    />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Submission'} />
  );
};

export default PastRumbleDetailsContainer;
