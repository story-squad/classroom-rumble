import React from 'react';
import { useHistory } from 'react-router';
import rumbleComplete from '../../../../../../assets/img/rumble_complete.svg';
import { Button } from '../../../../../common';

const FeedbackComplete = (): React.ReactElement => {
  const { push } = useHistory();

  // Push user back to dashboard
  const goBack = () => {
    push('/dashboard/student');
  };

  return (
    <div className="rumble-complete-wrapper">
      <img src={rumbleComplete} alt="rumble complete" />
      <div className="content">
        <h2>Great job!</h2>
        <p>You completed today&apos;s Rumble</p>
      </div>
      <Button onClick={goBack}>Back to Dashboard</Button>
    </div>
  );
};

export default FeedbackComplete;
