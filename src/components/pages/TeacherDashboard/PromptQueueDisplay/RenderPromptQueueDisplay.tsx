import React, { useState } from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';
import { CreateCustomPrompt } from './CreateCustomPrompt';
import PromptQueueItem from './PromptQueueItem';

const RenderPromptQueueDisplay = ({
  queue,
}: IRenderPromptQueueDisplayProps): React.ReactElement => {
  const [newPromptModalOpen, setNewPromptModalOpen] = useState(false);
  return (
    <>
      <CreateCustomPrompt
        isVisible={newPromptModalOpen}
        setIsVisible={setNewPromptModalOpen}
      />
      <div className="prompt-queue-display">
        <h2>Prompt Queue</h2>
        <button onClick={() => setNewPromptModalOpen(true)}>
          Custom Prompt
        </button>
        <div className="prompt-queue-list">
          {queue.map((prompt) => (
            <PromptQueueItem key={prompt.id} {...prompt} />
          ))}
        </div>
      </div>
    </>
  );
};

interface IRenderPromptQueueDisplayProps {
  queue: IPromptInQueue[];
}

export default RenderPromptQueueDisplay;
