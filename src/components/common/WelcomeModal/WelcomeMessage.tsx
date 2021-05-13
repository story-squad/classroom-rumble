import React from 'react';
import { Modal } from '../Modal';
import { IWelcomeModalProps } from './welcomeModalTypes';

const WelcomeMessage = ({
  isTeacher,
  closeModal,
  isChecked,
  toggleCheck,
}: Modal.ModalComponentProps &
  IWelcomeModalProps & {
    isChecked: boolean;
    toggleCheck: () => void;
  }): React.ReactElement => {
  return (
    <div>
      <p>Welcome to Classroom Rumble!</p>
      {isTeacher ? (
        <p>To get started, add a new class.</p>
      ) : (
        <p>To get started, get a join link from your teacher.</p>
      )}
      <div>
        <label>
          <input type="checkbox" checked={isChecked} onChange={toggleCheck} />
          Don&apos;t show again
        </label>
        <button onClick={closeModal}>Okay</button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
