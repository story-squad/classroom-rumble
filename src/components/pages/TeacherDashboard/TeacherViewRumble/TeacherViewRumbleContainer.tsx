import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { prompts, rumbles, sections } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const section = useRecoilValue(sections.current);
  const rumble = useRecoilValue(rumbles.current);
  const prompt = useRecoilValue(prompts.getById(rumble?.promptId));
  const addPrompts = useSetRecoilState(prompts.add);

  // TODO change this to use recoil prompt selectors
  const [getPromptById, promptIsLoading, , error] = useAsync({
    asyncFunction: Prompts.getPromptById,
    setter: addPrompts,
  });

  useEffect(() => {
    if (rumble && !prompt && !promptIsLoading) getPromptById(rumble.promptId);
  }, [rumble]);

  console.log({ section, rumble, prompt, promptIsLoading, error });

  return section && rumble && prompt && !promptIsLoading ? (
    <RenderTeacherViewRumble rumble={rumble} prompt={prompt.prompt} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : promptIsLoading ? (
    <Loader message={'Loading prompt'} />
  ) : (
    <Loader />
  );
};

export default TeacherViewRumbleContainer;
