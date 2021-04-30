import React from 'react';
import timelady from '../../../../../assets/img/waiting_time.svg';

const WaitingRoom = (): React.ReactElement => {
  return (
    <div className="waiting-room-wrapper">
      <img src={timelady} />
      Please Wait For Your Teacher To Start The Rumble
    </div>
  );
};

export default WaitingRoom;
