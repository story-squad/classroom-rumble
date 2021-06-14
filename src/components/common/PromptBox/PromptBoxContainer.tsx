import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { useRecoilValue } from 'recoil';
import { Feedback, Prompts, Rumbles } from '../../../api';
import { useAsync } from '../../../hooks';
import { rumbles, sections } from '../../../state';
import { Loader } from '../Loader';
import { CouldNotLoad } from './../CouldNotLoad';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for the specific Rumbles prompt.
 */

// TODO see if we needd the API call
const PromptBoxContainer = ({
  prompt: promptProp,
  isTeacher = false,
}: IPromptBoxContainerProps): React.ReactElement => {
  const currentRumbleId = useRecoilValue(rumbles.selected);
  const currentRumble = useRecoilValue(
    rumbles.getById(currentRumbleId as number),
  );
  const currentSection = useRecoilValue(sections.selected);
  const [endTime, setEndTime] = useState(currentRumble?.end_time);
  const [prompt, setPrompt] = useState<string | undefined>(promptProp);
  const { addToast } = useToasts();
  const { push } = useHistory();

  const [getPromptById, loading, , error] = useAsync({
    asyncFunction: Prompts.getPromptById,
    setter: setPrompt,
  });

  useEffect(() => {
    if (currentRumble && !prompt) {
      getPromptById(currentRumble.promptId);
    }
  }, [currentRumble]);

  const startRumble = async (): Promise<void> => {
    try {
      if (currentRumble?.end_time) {
        setEndTime(currentRumble.end_time);
      } else {
        const newEndTime = await Rumbles.startRumble(
          currentRumble?.id || 0,
          currentSection || 0,
        );
        console.log({ newEndTime });
        setEndTime(newEndTime);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startFeedback = async () => {
    try {
      if (currentRumble) {
        // No return, dont save as a variable
        await Feedback.startFeedback(currentRumble?.id);
        addToast('Successfully started the feedback phase! Redirecting...', {
          appearance: 'success',
        });
        // TODO update this with better UX
        setTimeout(() => {
          push('/dashboard/teacher');
          location.reload();
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return prompt && !loading ? (
    <RenderPromptBox
      prompt={prompt}
      phase={currentRumble?.phase}
      endTime={endTime}
      isTeacher={isTeacher}
      startRumble={isTeacher ? startRumble : undefined}
      startFeedback={isTeacher ? startFeedback : undefined}
    />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message="Loading prompt" />
  );
};

interface IPromptBoxContainerProps {
  prompt?: string;
  isTeacher?: boolean;
}

export default PromptBoxContainer;
