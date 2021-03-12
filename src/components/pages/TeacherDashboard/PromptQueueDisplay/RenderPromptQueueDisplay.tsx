import React, { useState } from 'react';
import { IPromptInQueue } from '../../../../api/Prompts';
import { CreateCustomPrompt } from './CreateCustomPrompt';
import PromptQueueItem from './PromptQueueItem';

const RenderPromptQueueDisplay = ({
  queue,
}: IRenderPromptQueueDisplayProps): React.ReactElement => {
  const [newPromptModalOpen, setNewPromptModalOpen] = useState(false);
  const openModal = () => setNewPromptModalOpen(true);
  return (
    <div className="prompt-queue-wrapper">
      <div className="prompt-queue-container">
        <CreateCustomPrompt
          isVisible={newPromptModalOpen}
          setIsVisible={setNewPromptModalOpen}
        />
        <h2>Select a Prompt to Start a Rumble</h2>
        <div className="prompt-queue-list">
          {queue.map((prompt) => (
            <PromptQueueItem key={prompt.id} {...prompt} />
          ))}
          <div className="custom-prompt-button" onClick={openModal}>
            <h3>Create Custom Prompt</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IRenderPromptQueueDisplayProps {
  queue: IPromptInQueue[];
}

export default RenderPromptQueueDisplay;
