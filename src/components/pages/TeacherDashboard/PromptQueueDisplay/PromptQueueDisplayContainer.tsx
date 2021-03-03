import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { prompts } from '../../../../state';
import { CouldNotLoad } from '../../../common';
import RenderPromptQueueDisplay from './RenderPromptQueueDisplay';

const PromptQueueDisplayContainer = (): React.ReactElement => {
  const [promptQueue, setPromptQueue] = useRecoilState(prompts.queue);
  const customPrompts = useRecoilValue(prompts.customList);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!promptQueue) {
      Prompts.getUpcoming()
        .then((res) => setPromptQueue(res))
        .catch((err) => {
          console.log(err);
          setError(err.message ?? 'Could not load prompt queue');
        });
    }
  }, []);

  return promptQueue ? (
    <RenderPromptQueueDisplay queue={[...customPrompts, ...promptQueue]} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading prompt queue</p>
  );
};

export default PromptQueueDisplayContainer;
