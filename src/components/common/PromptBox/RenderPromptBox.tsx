import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import { SubmissionForm } from './SubmissionForm';

const RenderPromptBox = ({ prompt }: Prompt): React.ReactElement => {
  // Store the user logged in status in a variable from RecoilStateValue
  const isLogged = useRecoilValue(auth.isLoggedIn);

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
          component={(props) => <SubmissionForm />}
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
      <div className="rumble-countdown">
        <p>Time Left to Submit!</p>
      </div>
      <div className="prompt-footer">
        {/* <button onClick={toggleModal} disabled={prompt?.submitted}>
          {prompt?.submitted ? 'Submission Received!' : 'Submit Your Story'}
        </button> */}
      </div>
    </div>
  );
};

interface Prompt {
  prompt: string;
}

export default RenderPromptBox;
