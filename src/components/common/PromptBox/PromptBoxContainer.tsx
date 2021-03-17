import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../api';
import { current } from '../../../state';
import { CouldNotLoad } from '../CouldNotLoad';
import { Loader } from '../Loader';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for the specific Rumbles prompt.
 */

const PromptBoxContainer = ({
  prompt,
}: IPromptBoxContainerProps): React.ReactElement => {
  const currentRumble = useRecoilValue(current.rumble);
  const [promptState, setPrompt] = useState<string | undefined>(prompt);
  const [error, setError] = useState<null | string>(null);

  /**
   * This useEffect will run every where the PromptBox common component renders in order to pull the prompt related to that page. Whether we are in the student or teacher view.
   */
  useEffect(() => {
    if (currentRumble && !prompt) {
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

  return promptState ? (
    <RenderPromptBox prompt={promptState} endTime={currentRumble?.end_time} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading prompt" />
  );
};

interface IPromptBoxContainerProps {
  prompt?: string;
}

export default PromptBoxContainer;
