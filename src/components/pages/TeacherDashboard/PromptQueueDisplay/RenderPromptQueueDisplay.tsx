import React, { useState } from 'react';
import { CreateCustomPrompt } from './CreateCustomPrompt';
import PromptQueueItem from './PromptQueueItem';

const RenderPromptQueueDisplay = ({
  queue,
}: IRenderPromptQueueDisplayProps): React.ReactElement => {
  const [newPromptModalOpen, setNewPromptModalOpen] = useState(false);
  const openModal = () => setNewPromptModalOpen(true);
  return (
    <>
      <CreateCustomPrompt
        isVisible={newPromptModalOpen}
        setIsVisible={setNewPromptModalOpen}
      />
      <div className="prompt-queue-wrapper">
        <div className="prompt-queue-container">
          <h2>Select a Prompt to Start a Rumble</h2>
          <div className="prompt-queue-list">
            {queue.map((id) => (
              <PromptQueueItem key={id} promptId={id} />
            ))}
            <div className="custom-prompt-button" onClick={openModal}>
              <h3>Create Custom Prompt</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface IRenderPromptQueueDisplayProps {
  queue: number[];
}

export default RenderPromptQueueDisplay;
