import React from 'react';
import { Button } from '../Button';
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
    <div className="welcome-container">
      <div className="welcome-message">
        <p>Welcome to Classroom Rumble!</p>
        {isTeacher ? (
          <p>To get started, add a new class.</p>
        ) : (
          <p>To get started, get a join link from your teacher.</p>
        )}
      </div>
      <div className="button-row">
        <label>
          <input type="checkbox" checked={isChecked} onChange={toggleCheck} />
          Don&apos;t show again
        </label>
        <Button type="primary" onClick={closeModal}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
