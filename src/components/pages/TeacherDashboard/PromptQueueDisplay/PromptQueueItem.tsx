import { DateTime } from 'luxon';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { prompts } from '../../../../state';

const PromptQueueItem = ({
  promptId,
}: {
  promptId: number;
}): React.ReactElement => {
  const { push } = useHistory();

  const prompt = useRecoilValue(prompts.getById(promptId));

  const newRumbleFromThisPrompt = () => {
    push('/dashboard/teacher/rumble/new');
  };

  return (
    <div className="prompt-queue-item" onClick={newRumbleFromThisPrompt}>
      {prompt?.starts_at ? (
        <h3>{formatDate(DateTime.fromISO(prompt.starts_at))}</h3>
      ) : (
        <h3>Custom</h3>
      )}
      <p>{prompt?.prompt}</p>
    </div>
  );
};

const formatDate = (date: DateTime): string =>
  date.toLocaleString({ weekday: 'long' });

export default PromptQueueItem;
