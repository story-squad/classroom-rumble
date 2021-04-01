import React from 'react';
import { useHistory } from 'react-router';
import rumbleComplete from '../../../../../../assets/img/rumble-complete.svg';

const RumbleComplete = (): React.ReactElement => {
  const { push } = useHistory();

  // Push user back to dashboard
  const goBack = () => {
    push('/dashboard/student');
  };
  return (
    <div className="rumble-complete-wrapper">
      <div className="complete-img">
        <img src={rumbleComplete} alt="rumble complete" />
      </div>
      <div className="content">
        <h1>Great job!</h1>
        <p>You completed today&apos;s Rumble</p>
      </div>
      <button className="complete-btn" onClick={goBack}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default RumbleComplete;
