import React, { useState } from 'react';

const WelcomeModal = (): React.ReactElement => {
  const [isChecked, setIsChecked] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  const closePopup = () => setIsShowing(false);

  return isShowing ? (
    <div>
      <p>Welcome to Classroom Rumble!</p>
      <p>To get started, add a new class</p>
      <div>
        <label>
          <input type="checkbox" checked={isChecked} onChange={toggleCheck} />{' '}
          Don&apos;t show again
        </label>
        <button onClick={closePopup}>Okay</button>
      </div>
    </div>
  ) : (
    <> </>
  );
};

export default WelcomeModal;
