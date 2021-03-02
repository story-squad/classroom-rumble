import React from 'react';
import { Modal } from '../../../common';
import CreateNewSectionForm from './CreateNewSectionForm';

const CreateNewSection = ({
  isVisible,
  setIsVisible,
}: ICreateNewSectionProps): React.ReactElement => {
  return (
    <Modal.Component
      visible={isVisible}
      setVisible={setIsVisible}
      component={CreateNewSectionForm}
      title="Create New Section"
    />
  );
};

interface ICreateNewSectionProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export default CreateNewSection;
