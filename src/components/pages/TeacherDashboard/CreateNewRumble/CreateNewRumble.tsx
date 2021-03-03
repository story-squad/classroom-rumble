import React from 'react';
import { Modal } from '../../../common';
import CreateNewRumbleForm from './CreateNewRumbleForm';

const CreateNewRumble = ({
  isVisible,
  setIsVisible,
}: ICreateNewRumbleProps): React.ReactElement => {
  return (
    <Modal.Component
      visible={isVisible}
      setVisible={setIsVisible}
      component={CreateNewRumbleForm}
      title="Create New Rumble"
    />
  );
};

interface ICreateNewRumbleProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export default CreateNewRumble;
