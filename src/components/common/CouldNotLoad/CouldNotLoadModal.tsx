import React, { ComponentProps } from 'react';
import { Alert } from '../Alert';
import { Button } from '../Button';
import CouldNotLoad from './CouldNotLoad';

const CouldNotLoadModal = ({
  visible,
  setVisible,
  ...composedProps
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
          <CouldNotLoad {...props} {...composedProps} />
          <div className="go-back-button">
            <Button onClick={closeAlert}>Go back!</Button>
          </div>
        </>
      )}
    />
  );
};

interface ICouldNotLoadModalProps extends ComponentProps<typeof CouldNotLoad> {
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}

export default CouldNotLoadModal;
