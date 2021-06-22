import React from 'react';
import { useHistory } from 'react-router';
import surfer from '../../../../../../assets/img/female_surfer.svg';
import { Button } from '../../../../../common';

const SubmissionSuccess = (): React.ReactElement => {
  const { push } = useHistory();
  const goBack = () => {
    push('/dashboard/student');
  };
  return (
    <div className="submission-success-wrapper">
      <div className="success-image-wrapper">
        <img src={surfer} alt="submission-successful" />
      </div>
      <p>Your submission was received!</p>
      {/* <p>Peer Review will begin in:</p>
      <p>Rumble Timer</p> */}
      <Button onClick={goBack}>Back to Dashboard</Button>
    </div>
  );
};

export default SubmissionSuccess;
