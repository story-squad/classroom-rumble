import React from 'react';
import { useRecoilState } from 'recoil';
import { modals } from '../../../../state';
import { Modal } from '../../../common';
import ParentValidationForm from './ParentValidationForm';

const ParentValidationModal = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useRecoilState(
    modals.validationModalIsOpen,
  );
  return (
    <Modal.Component
      className="parent-validation"
      visible={isVisible}
      setVisible={setIsVisible}
      centered
      title={'Request Parent Validation'}
      component={() => <ParentValidationForm />}
    />
  );
};

export default ParentValidationModal;
