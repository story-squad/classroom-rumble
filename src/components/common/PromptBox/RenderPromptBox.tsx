import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth, prompts } from '../../../state';
import { Modal } from '../Modal';
import { SubmissionForm } from './SubmissionForm';

/**
 * If a student makes it into a rumble there will be a prompt and countdown timer.
 * @param Prompt is a string that is pulled directly from a rumb;e.
 * @returns a submissions form to receive the users image.
 */

const RenderPromptBox = ({ prompt }: Prompt): React.ReactElement => {
  // Store the user logged in status in a variable from RecoilStateValue
  const isLogged = useRecoilValue(auth.isLoggedIn);
  const promp = useRecoilValue(prompts.currentPrompt);

  // Modal State Handlers
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    if (isLogged) setShowModal((cur) => !cur);
  };

  return (
    <div className="prompt-box">
      {isLogged && (
        <Modal.Component
          className="submissions"
          component={(props) => <SubmissionForm {...props} />}
          visible={showModal}
          setVisible={setShowModal}
          centered={!!isLogged}
          title={isLogged ? 'Submit your Story' : ''}
        />
      )}
      {prompt ? (
        // If there is a prompt then load in the message "Today's Prompt"
        <>
          <h2>Today&apos;s Prompt</h2>
          <p>{prompt}</p>
        </>
      ) : (
        // TODO - since prompts are not closing ever we are going to display today's prompt at
        <>
          <p>Loading Prompt...</p>
        </>
      )}
      <p className="countdown-display">Time Left to Submit HERE!</p>
      <div className="prompt-footer">
        <button onClick={toggleModal} disabled={promp?.hasSubmitted}>
          {promp?.hasSubmitted ? 'Submission Received!' : 'Submit Your Story'}
        </button>
      </div>
    </div>
  );
};

interface Prompt {
  prompt: string;
}

export default RenderPromptBox;
