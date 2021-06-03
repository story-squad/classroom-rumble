import React from 'react';
import { Alert } from '../Alert';
import { Button } from '../Button';
import CouldNotLoad from './CouldNotLoad';

const CouldNotLoadModal = ({
  error,
  visible,
  setVisible,
}: ICouldNotLoadModalProps): React.ReactElement => {
  const closeAlert = () => {
    setVisible(false);
  };

  return (
    <Alert.Component
      className="could-not-load-modal"
      visible={visible}
      setVisible={setVisible}
      centered
      component={(props) => (
        <>
          <CouldNotLoad {...props} error={error} />
          <Button onClick={closeAlert}>GO BACK</Button>
        </>
      )}
    />
  );
};

interface ICouldNotLoadModalProps {
  error: string;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}

export default CouldNotLoadModal;
