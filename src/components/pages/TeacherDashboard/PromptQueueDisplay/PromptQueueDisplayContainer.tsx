import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { prompts } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderPromptQueueDisplay from './RenderPromptQueueDisplay';

const PromptQueueDisplayContainer = (): React.ReactElement => {
  const [promptQueue, setPromptQueue] = useRecoilState(prompts.queueIds);
  const customPrompts = useRecoilValue(prompts.customIds);
  const addPrompts = useSetRecoilState(prompts.add);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!promptQueue && !loading) {
      setLoading(true);
      Prompts.getUpcoming()
        .then((prompts) => {
          addPrompts(prompts);
          const ids = prompts.map((p) => p.id);
          setPromptQueue(ids);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, []);

  return promptQueue ? (
    <RenderPromptQueueDisplay queue={[...promptQueue, ...customPrompts]} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : loading ? (
    <Loader message={'Loading prompt queue'} />
  ) : (
    <>Could not load prompts.</>
  );
};

export default PromptQueueDisplayContainer;
