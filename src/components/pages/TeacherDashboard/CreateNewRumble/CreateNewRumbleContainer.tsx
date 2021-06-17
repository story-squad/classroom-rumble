import React from 'react';
import { useRecoilValue } from 'recoil';
import { prompts } from '../../../../state';
import RenderCreateNewRumble from './RenderCreateNewRumble';

const CreateNewRumble = (): React.ReactElement => {
  const selectedPrompt = useRecoilValue(prompts.current);
  return selectedPrompt ? (
    <RenderCreateNewRumble prompt={selectedPrompt} />
  ) : (
    <p>Redirecting...</p>
  );
};

export default CreateNewRumble;
