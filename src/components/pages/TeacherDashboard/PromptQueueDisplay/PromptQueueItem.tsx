import { DateTime } from 'luxon';
import React from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';

const PromptQueueItem = ({
  prompt,
  starts_at,
}: IPromptInQueue): React.ReactElement => {
  return (
    <div className="prompt-queue-card">
      <h3>{formatDate(DateTime.fromISO(starts_at))}</h3>
      <p>{prompt}</p>
    </div>
  );
};

const formatDate = (date: DateTime): string =>
  date.toLocaleString({ weekday: 'long' });

export default PromptQueueItem;
