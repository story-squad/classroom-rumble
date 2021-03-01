import { DateTime } from 'luxon';
import React from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';

const PromptQueueItem = ({
  prompt,
  starts_at,
}: IPromptInQueue): React.ReactElement => {
  return (
    <div className="prompt-queue-item">
      <h2>{formatDate(DateTime.fromISO(starts_at))}</h2>
      <p>{prompt}</p>
    </div>
  );
};

const formatDate = (date: DateTime): string =>
  date.toLocaleString({ weekday: 'long' });

export default PromptQueueItem;
