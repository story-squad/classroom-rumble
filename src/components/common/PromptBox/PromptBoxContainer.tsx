import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Feedback, Prompts, Rumbles } from '../../../api';
import { useAsync } from '../../../hooks';
import { prompts, rumbles, sections } from '../../../state';
import { Loader } from '../Loader';
import { CouldNotLoad } from './../CouldNotLoad';
import RenderPromptBox from './RenderPromptBox';

/**
 * PromptBoxContainer will run a useEffect to check for the specific Rumbles prompt.
 */

// TODO see if we needd the API call
const PromptBoxContainer = ({
  isTeacher = false,
}: IPromptBoxContainerProps): React.ReactElement => {
  const { addToast } = useToasts();
  const { push } = useHistory();

  const [currentRumble, updateCurrentRumble] = useRecoilState(rumbles.current);
  const prompt = useRecoilValue(prompts.getById(currentRumble?.promptId));
  const addPrompts = useSetRecoilState(prompts.add);
  const currentSection = useRecoilValue(sections.selected);

  const [getPromptById, loading, , error] = useAsync({
    asyncFunction: Prompts.getPromptById,
    setter: (promptFromAPI) => {
      addPrompts(promptFromAPI);
    },
  });

  useEffect(() => {
    if (currentRumble && !prompt) {
      getPromptById(currentRumble.promptId);
    }
  }, [currentRumble]);

  const startRumble = async (): Promise<void> => {
    try {
      if (currentRumble && currentRumble.phase === 'INACTIVE') {
        const newEndTime = await Rumbles.startRumble(
          currentRumble?.id || 0,
          currentSection || 0,
        );
        updateCurrentRumble((prev) =>
          prev ? { ...prev, end_time: newEndTime, phase: 'ACTIVE' } : undefined,
        );
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
      startTime={currentRumble?.start_time}
      prompt={prompt.prompt}
      phase={currentRumble?.phase}
      endTime={currentRumble?.end_time}
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
  startTime?: Date;
  prompt?: string;
  isTeacher?: boolean;
}

export default PromptBoxContainer;
