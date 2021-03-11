import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Prompts } from '../../../api';
import { prompts } from '../../../state';
import { PromptBoxProps } from './PromptBoxTypes';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for today's prompt.
 */

const PromptBoxContainer = (props: PromptBoxProps): React.ReactElement => {
  // Grab prompts from recoil state
  const [prompt, setPrompt] = useRecoilState(prompts.currentPrompt);

  // TODO - what will we use to replace `active` fomr "getTimeUntilEvent"? I assume nothing bc we want to leave the Submit button open for ever
  // const { active } = time.getTimeUntilEvent('submit');

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
    <>
      <RenderPromptBox {...props} />
    </>
  );
};

export default PromptBoxContainer;
