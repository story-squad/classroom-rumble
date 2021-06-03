import React from 'react';
import { Alert } from '../Alert';
import CouldNotLoad from './CouldNotLoad';

const CouldNotLoadModal = ({
  error,
  visible,
  setVisible,
}: ICouldNotLoadModalProps): React.ReactElement => {
  return (
    <Alert.Component
      className="could-not-load-modal"
      visible={visible}
      setVisible={setVisible}
      centered
      component={(props) => <CouldNotLoad {...props} error={error} />}
    />
  );
};

interface ICouldNotLoadModalProps {
  error: string;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}

export default CouldNotLoadModal;
