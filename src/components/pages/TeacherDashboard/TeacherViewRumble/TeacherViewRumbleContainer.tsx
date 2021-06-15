import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync, useResetOnUnmount } from '../../../../hooks';
import { rumbles, sections } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const section = useRecoilValue(sections.current);
  const rumbleId = useRecoilValue(rumbles.selected);
  useResetOnUnmount({ recoil: [sections.selected, rumbles.selected] });

  // TODO change this to use recoil prompt selectors
  const [getPromptById, promptIsLoading, prompt, error] = useAsync({
    asyncFunction: Prompts.getPromptById,
  });

  useEffect(() => {
    if (rumbleId) getPromptById(rumbleId);
  }, [rumbleId]);

  return section && rumbleId && prompt && !promptIsLoading ? (
    <RenderTeacherViewRumble rumbleId={rumbleId} prompt={prompt} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : promptIsLoading ? (
    <Loader message={'Loading prompt'} />
  ) : (
    <Loader />
  );
};

export default TeacherViewRumbleContainer;
