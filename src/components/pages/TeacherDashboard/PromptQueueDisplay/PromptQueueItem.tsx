import { DateTime } from 'luxon';
import React from 'react';
import { Prompts } from '../../../../api';

const PromptQueueItem = ({
  prompt,
  starts_at,
}: Prompts.IPromptInQueue): React.ReactElement => {
  return (
    <div className="prompt-queue-card">
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
  date.toLocaleString({ weekday: 'long' });

export default PromptQueueItem;
