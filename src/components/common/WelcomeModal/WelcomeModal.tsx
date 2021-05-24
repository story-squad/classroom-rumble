import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { Modal } from '../Modal';
import WelcomeMessage from './WelcomeMessage';
import { IWelcomeModalProps } from './welcomeModalTypes';

const WelcomeModal = ({
  isTeacher = false,
}: IWelcomeModalProps): React.ReactElement => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const user = useRecoilValue(auth.user);

  const hideWelcomeModal = `hideWelcomeModal:${user?.id}`;

  const get = (): boolean => !!localStorage.getItem(hideWelcomeModal);
  const set = (): void => localStorage.setItem(hideWelcomeModal, 'yes');
  const clear = (): void => localStorage.removeItem(hideWelcomeModal);

  useEffect(() => {
    const hideWelcome = get();
    setIsChecked(hideWelcome);
    setIsVisibile(!hideWelcome);
  }, [user]);

  const toggleCheck = () => {
    setIsChecked((check) => {
      check ? clear() : set();
      return !check;
    });
  };

  return isVisibile ? (
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
  ) : (
    <> </>
  );
};

export default WelcomeModal;
