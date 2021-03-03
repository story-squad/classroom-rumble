import React from 'react';
import { Modal } from '../../../../common';
import CreateCustomPromptForm from './CreateCustomPromptForm';

const CreateCustomPrompt = ({
  isVisible,
  setIsVisible,
}: ICreateCustomPromptProps): React.ReactElement => {
  return (
    <Modal.Component
      component={(props) => <CreateCustomPromptForm {...props} />}
      visible={isVisible}
      setVisible={setIsVisible}
      title="Custom Prompt"
      centered
    />
  );
};

interface ICreateCustomPromptProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export default CreateCustomPrompt;
