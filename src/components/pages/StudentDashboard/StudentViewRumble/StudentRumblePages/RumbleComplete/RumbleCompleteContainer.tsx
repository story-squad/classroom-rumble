import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Students } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { auth, rumbles, sections, submissions } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderRumbleComplete from './RenderRumbleComplete';

const RumbleCompleteContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.current);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(sections.current);
  const [selectedSubId, setSelectedSubId] = useRecoilState(
    submissions.selected,
  );
  const submission = useRecoilValue(submissions.getById(selectedSubId));
  const addSubmissions = useSetRecoilState(submissions.add);

  const [getSubForRumble, , , error] = useAsync({
    asyncFunction: Students.getSubForRumble,
    setter: (subFromAPI) => {
      if (subFromAPI) {
        addSubmissions(subFromAPI);
        setSelectedSubId(subFromAPI.id);
      }
    },
  });

  useEffect(() => {
    if (rumble && user && !submission) {
      getSubForRumble(rumble.id, user.id);
    }
  }, [rumble, user]);

  return selectedSubId && section ? (
    <RenderRumbleComplete sectionId={section.id} submissionId={selectedSubId} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading Submission'} />
  );
};

export default RumbleCompleteContainer;
