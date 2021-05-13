import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import WelcomeMessage from './WelcomeMessage';
import { IWelcomeModalProps } from './welcomeModalTypes';

const WelcomeModal = ({
  isTeacher,
}: IWelcomeModalProps): React.ReactElement => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisibile, setIsVisibile] = useState(true);
  const user = useRecoilValue(auth.user);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  // pass in a userID as a prop and use the user id in the local storage key if person hits the checkbox

  return (
    <Modal.Component
      centered
      visible={isVisibile}
      setVisible={setIsVisibile}
      component={(props) => (
        <WelcomeMessage
          {...props}
          isTeacher={isTeacher}
          isChecked={isChecked}
          toggleCheck={toggleCheck}
        />
      )}
    />
  );
};

export default WelcomeModal;
