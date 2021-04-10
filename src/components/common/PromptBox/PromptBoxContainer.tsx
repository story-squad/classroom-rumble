import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts, Rumbles } from '../../../api';
import { current } from '../../../state';
import { CouldNotLoad } from '../CouldNotLoad';
import { Loader } from '../Loader';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for the specific Rumbles prompt.
 */

const PromptBoxContainer = ({
  prompt,
  isTeacher = false,
}: IPromptBoxContainerProps): React.ReactElement => {
  const currentRumble = useRecoilValue(current.rumble);
  const currentSection = useRecoilValue(current.section);
  const [endTime, setEndTime] = useState(currentRumble?.end_time);
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

  const startRumble = useCallback(async (): Promise<void> => {
    try {
      if (currentRumble?.end_time) {
        setEndTime(currentRumble.end_time);
      } else {
        const newEndTime = await Rumbles.startRumble(
          currentRumble?.id || 0,
          currentSection?.id || 0,
        );
        console.log({ newEndTime });
        setEndTime(newEndTime);
      }
    } catch (err) {
      console.log(err);
    }
  }, [currentRumble]);

  return promptState ? (
    <RenderPromptBox
      prompt={promptState}
      endTime={endTime}
      isTeacher={isTeacher}
      startRumble={isTeacher ? startRumble : undefined}
    />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading prompt" />
  );
};

interface IPromptBoxContainerProps {
  prompt?: string;
  isTeacher?: boolean;
}

export default PromptBoxContainer;
