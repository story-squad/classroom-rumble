import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { auth, prompts } from '../../../state';
import { Modal } from '../Modal';
import { PromptBoxProps } from './PromptBoxTypes';
import SubmissionForm from './SubmissionForm';

const RenderPromptBox = ({ promptId }: PromptBoxProps): React.ReactElement => {
  // Store the prompt in a var from the RecoilStateValue
  const prompt = useRecoilValue(prompts.currentPrompt);
  // Store the user logged in status in a variable from RecoilStateValue
  const isLogged = useRecoilValue(auth.isLoggedIn);

  // TODO - I do not think we will need this, will we?
  const setAuthModalVisible = useSetRecoilState(auth.authModalOpen);

  // Modal State Handlers
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    if (isLogged) setShowModal((cur) => !cur);
    else setAuthModalVisible(true);
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
          <p>{prompt.prompt}</p>
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
        <button onClick={toggleModal} disabled={prompt?.submitted}>
          {prompt?.submitted ? 'Submission Received!' : 'Submit Your Story'}
        </button>
      </div>
    </div>
  );
};

export default RenderPromptBox;
