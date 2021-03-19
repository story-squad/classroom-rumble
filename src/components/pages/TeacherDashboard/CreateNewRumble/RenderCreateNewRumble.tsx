import { DateTime } from 'luxon';
import React from 'react';
import { Prompts } from '../../../../api';
import CreateNewRumbleForm from './CreateNewRumbleForm';

const RenderCreateNewRumble = ({
  prompt,
}: IRenderCreateRumbleProps): React.ReactElement => {
  console.log(prompt);
  return (
    <div className="create-new-rumble-wrapper">
      <div className="create-new-rumble-container">
        <div className="prompt-display">
          <h2>Prompt</h2>
          <h3>{prompt.starts_at ? formatDate(prompt.starts_at) : 'Custom'}</h3>
          <p>{prompt.prompt}</p>
        </div>
        <CreateNewRumbleForm prompt={prompt} />
      </div>
    </div>
  );
};

const formatDate = (date: string) =>
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);

interface IRenderCreateRumbleProps {
  prompt: Prompts.IPromptInQueue;
}

export default RenderCreateNewRumble;
