import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync, useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'rumble');
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const [prompt, setPrompt] = useState<string>();

  const [getPromptById, promptIsLoading, , error] = useAsync({
    asyncFunction: Prompts.getPromptById,
    setter: setPrompt,
  });

  useEffect(() => {
    if (rumble) getPromptById(rumble.promptId);
  }, [rumble]);

  return section && rumble && prompt && !isLoading && !promptIsLoading ? (
    <RenderTeacherViewRumble
      rumble={rumble}
      section={section}
      prompt={prompt}
    />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : isLoading || promptIsLoading ? (
    <Loader message={'Loading rumble'} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewRumbleContainer;
