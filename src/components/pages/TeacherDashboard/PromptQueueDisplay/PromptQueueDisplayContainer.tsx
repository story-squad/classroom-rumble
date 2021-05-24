import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { prompts } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderPromptQueueDisplay from './RenderPromptQueueDisplay';

const PromptQueueDisplayContainer = (): React.ReactElement => {
  const [promptQueue, setPromptQueue] = useRecoilState(prompts.queue);
  const customPrompts = useRecoilValue(prompts.customList);

  const [getUpcoming, isLoading, , error] = useAsync({
    asyncFunction: Prompts.getUpcoming,
    setter: setPromptQueue,
  });

  useEffect(() => {
    if (!promptQueue) {
      getUpcoming();
    }
  }, []);

  return promptQueue ? (
    <RenderPromptQueueDisplay queue={[...promptQueue, ...customPrompts]} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : isLoading ? (
    <Loader message={'Loading prompt queue'} />
  ) : (
    <>Could not load prompts.</>
  );
};

export default PromptQueueDisplayContainer;
