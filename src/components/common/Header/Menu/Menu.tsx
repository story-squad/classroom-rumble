import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { auth, modals } from '../../../../state';
import Logout from './Logout';

// For future things to be added for the drop down

const Menu = (): React.ReactElement => {
  const userInfo = useRecoilValue(auth.user);
  const setParentValidationOpen = useSetRecoilState(
    modals.validationModalIsOpen,
  );
  const openParentValidationModal = () => setParentValidationOpen(true);

  return (
    <>
      <Logout />
      {!userInfo?.isValidated && (
        <div onClick={openParentValidationModal}>
          <p>Parent Validation</p>
        </div>
      )}
    </>
  );
};

export default Menu;
