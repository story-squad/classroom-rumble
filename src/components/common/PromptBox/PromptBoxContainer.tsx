import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Prompts } from '../../../api';
import { prompts } from '../../../state';
import RenderPromptBox from './RenderPromptBox';

/**
 * The prompt box will live within each students Rumble Game instance.
 */

const PromptBoxContainer = (): React.ReactElement => {
  // Grab prompts from recoil state
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);

  // TODO - what will we use to replace `active` fomr "getTimeUntilEvent"? I assume nothing bc we want to leave the Submit button open for ever

  useEffect(() => {
    if (!prompt) {
      Prompts.getCurrent()
        .then(({ data }) => {
          console.log('Current Prompt: ', data);
          setPrompt(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <RenderPromptBox />
    </div>
  );
};

export default PromptBoxContainer;
