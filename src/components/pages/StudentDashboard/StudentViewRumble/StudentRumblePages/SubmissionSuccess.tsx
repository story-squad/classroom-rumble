import React from 'react';
import surfer from '../../../../../assets/img/female_surfer.svg';

const SubmissionSuccess = (): React.ReactElement => {
  return (
    <div className="submission-success-wrapper">
      <div className="success-image-wrapper">
        <img src={surfer} alt="submission-successful" />
      </div>
      <p>Your submission was received!</p>
      {/* <p>Peer Review will begin in:</p>
      <p>Rumble Timer</p> */}
    </div>
  );
};

export default SubmissionSuccess;
