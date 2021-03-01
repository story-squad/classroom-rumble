import React from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';
import PromptQueueItem from './PromptQueueItem';

const RenderPromptQueueDisplay = ({
  queue,
}: IRenderPromptQueueDisplayProps): React.ReactElement => {
  return (
    <div className="prompt-queue-display">
      <h1>Prompt Queue</h1>
      {queue.map((prompt) => (
        <PromptQueueItem key={prompt.id} {...prompt} />
      ))}
    </div>
  );
};

interface IRenderPromptQueueDisplayProps {
  queue: IPromptInQueue[];
}

export default RenderPromptQueueDisplay;
