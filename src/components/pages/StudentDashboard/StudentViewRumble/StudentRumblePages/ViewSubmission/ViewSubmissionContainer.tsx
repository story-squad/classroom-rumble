import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Students } from '../../../../../../api';
import { useAsync, useResetOnUnmount } from '../../../../../../hooks';
import { auth, rumbles, sections, submissions } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPastRumbleDetails from './RenderViewSubmission';

const PastRumbleDetailsContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.current);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(sections.current);
  const [selectedSubId, setSelectedSubId] = useRecoilState(
    submissions.selected,
  );
  const submission = useRecoilValue(submissions.getById(selectedSubId));
  const addSubmissions = useSetRecoilState(submissions.add);

  useResetOnUnmount({
    recoil: [submissions.selected, rumbles.selected],
  });

  const [getSubForRumble, , subFromAPI, error] = useAsync({
    asyncFunction: Students.getSubForRumble,
    enableLogs: true,
  });

  useEffect(() => {
    if (rumble && user && !submission) {
      console.log('getting sub');
      getSubForRumble(rumble.id, user.id);
    }
  }, [rumble, user]);

  useEffect(() => {
    if (subFromAPI) {
      console.log('sub GET', subFromAPI);
      addSubmissions(subFromAPI);
      setSelectedSubId(subFromAPI.id);
    }
  }, [subFromAPI]);

  useEffect(() =>
    console.log({ rumble, selectedSubId, submission, user, section, error }),
  );

  return selectedSubId && section ? (
    <RenderPastRumbleDetails
      sectionId={section.id}
      submissionId={selectedSubId}
    />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Submission'} />
  );
};

export default PastRumbleDetailsContainer;
