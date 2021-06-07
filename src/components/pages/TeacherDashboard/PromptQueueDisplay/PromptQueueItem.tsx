import { DateTime } from 'luxon';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Prompts } from '../../../../api';

const PromptQueueItem = ({
  prompt,
  starts_at,
  ...promptProps
}: Prompts.IPromptInQueue): React.ReactElement => {
  const { push } = useHistory();

  const newRumbleFromThisPrompt = () => {
    push('/dashboard/teacher/rumble/new', {
      prompt,
      starts_at,
      ...promptProps,
    });
  };

  return (
    <div className="prompt-queue-item" onClick={newRumbleFromThisPrompt}>
      {starts_at ? (
        <h3>{formatDate(DateTime.fromISO(starts_at))}</h3>
      ) : (
        <h3>Custom</h3>
      )}
      <p>{prompt}</p>
    </div>
  );
};

const formatDate = (date: DateTime): string =>
  date.plus({ day: 1 }).toLocaleString({ weekday: 'long' });

export default PromptQueueItem;
