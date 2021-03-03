import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Prompts } from '../../../../api';
import RenderCreateNewRumble from './RenderCreateNewRumble';

const CreateNewRumble = ({
  history,
}: RouteComponentProps): React.ReactElement => {
  const selectedPrompt = useMemo(
    () => history.location.state as Prompts.IPrompt | undefined,
    [history],
  );
  return <RenderCreateNewRumble defaultSelected={selectedPrompt} />;
};

export default CreateNewRumble;
