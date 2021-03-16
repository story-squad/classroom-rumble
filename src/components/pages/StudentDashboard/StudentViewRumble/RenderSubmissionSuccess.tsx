import React from 'react';
import surfer from '../../../../utils/images/female-surfer.svg';
const RenderSubmissionSuccess = (): React.ReactElement => {
  return (
    <div className="submission-success-wrapper">
      <h2>DATE HERE</h2>
      <div className="success-image-wrapper">
        <img src={surfer} alt="submission-successful" />
      </div>
      <p>Your submission was received!</p>
      {/* <p>Peer Review will begin in:</p>
      <p>Rumble Timer</p> */}
    </div>
  );
};

export default RenderSubmissionSuccess;
