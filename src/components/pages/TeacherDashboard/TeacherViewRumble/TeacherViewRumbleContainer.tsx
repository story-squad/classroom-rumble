import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync, useCheckBrowserState } from '../../../../hooks';
import { rumbles, sections } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'rumble');
  const section = useRecoilValue(sections.current);
  const rumbleId = useRecoilValue(rumbles.selected);

  const [getPromptById, promptIsLoading, prompt, error] = useAsync({
    asyncFunction: Prompts.getPromptById,
  });

  useEffect(() => {
    if (rumbleId) getPromptById(rumbleId);
  }, [rumbleId]);

  return section && rumbleId && prompt && !isLoading && !promptIsLoading ? (
    <RenderTeacherViewRumble rumbleId={rumbleId} prompt={prompt} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : isLoading || promptIsLoading ? (
    <Loader message={'Loading rumble'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewRumbleContainer;
