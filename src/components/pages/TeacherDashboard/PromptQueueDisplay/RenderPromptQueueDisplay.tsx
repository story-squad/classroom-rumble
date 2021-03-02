import React from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';
import PromptQueueItem from './PromptQueueItem';

const RenderPromptQueueDisplay = ({
  queue,
}: IRenderPromptQueueDisplayProps): React.ReactElement => {
  return (
    <div className="prompt-queue-display">
      <h2>Prompt Queue</h2>
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
