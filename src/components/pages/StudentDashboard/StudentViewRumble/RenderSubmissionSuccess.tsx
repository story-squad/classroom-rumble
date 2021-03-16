import React from 'react';
import surfer from '../../../../utils/images/female-surfer.svg';
import { Header } from '../../../common';
const RenderSubmissionSuccess = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="submission-success-wrapper">
        <div className="success-image-wrapper">
          <img src={surfer} alt="submission-successful" />
        </div>
        <p>Your submission was received!</p>
        {/* <p>Peer Review will begin in:</p>
      <p>Rumble Timer</p> */}
      </div>
    </>
  );
};

export default RenderSubmissionSuccess;
