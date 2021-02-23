import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { auth, reset } from '../../../state';
import { token } from '../../../utils';
import { Modal } from '../Modal';

const LogoutPopup = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useRecoilState(auth.logoutModalOpen);
  return (
    <Modal.Component
      component={LogoutComponent}
      setVisible={setIsVisible}
      visible={isVisible}
      centered
    />
  );
};

const LogoutComponent = (
  props: Modal.ModalComponentProps,
): React.ReactElement => {
  const { push } = useHistory();
  const resetRecoilState = useSetRecoilState(reset);
  const logout = () => {
    resetRecoilState(undefined);
    token.clear();
    token.clearUser();
    push('/');
  };
  return (
    <div className="signout-confirmation">
      <p>Are you sure you&apos;d like to sign out?</p>
      <div className="button-row">
        <button onClick={logout}>Yes</button>
        <button className="no-button" onClick={props.closeModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
