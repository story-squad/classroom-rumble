import React from 'react';
import { Prompts } from '../../../../api';
import CreateNewRumbleForm from './CreateNewRumbleForm';

const RenderCreateNewRumble = ({
  defaultSelected,
}: IRenderCreateRumbleProps): React.ReactElement => {
  return (
    <div className="create-new-rumble">
      <h2>Create New Rumble</h2>
      <CreateNewRumbleForm defaultSelected={defaultSelected} />
    </div>
  );
};

interface IRenderCreateRumbleProps {
  defaultSelected?: Prompts.IPrompt;
}

export default RenderCreateNewRumble;
