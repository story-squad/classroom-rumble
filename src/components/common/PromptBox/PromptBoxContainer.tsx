import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../api';
import { current } from '../../../state';
import { CouldNotLoad } from '../CouldNotLoad';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for the specific Rumbles prompt.
 */

const PromptBoxContainer = (): React.ReactElement => {
  const currentRumble = useRecoilValue(current.rumble);
  const [prompt, setPrompt] = useState<string>();
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (currentRumble) {
      Prompts.getPromptById(currentRumble.promptId)
        .then((data) => {
          console.log('Current Prompt: ', data);
          setPrompt(data);
        })
        .catch((err) => {
          console.log({ err });
          setError('There is no prompt for this Rumble.');
        });
    }
  }, []);

  return prompt ? (
    <RenderPromptBox prompt={prompt} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <>
      <p>Loading Prompt...</p>
    </>
  );
};

export default PromptBoxContainer;
