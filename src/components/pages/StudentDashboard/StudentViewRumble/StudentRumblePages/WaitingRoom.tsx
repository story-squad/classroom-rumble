import React from 'react';
import logo from '../../../../../assets/img/waiting-time.svg';

const WaitingRoom = (): React.ReactElement => {
  return (
    <div className="waiting-room-wrapper">
      <img src={logo} />
      Please Wait For Your Teacher To Start The Rumble
    </div>
  );
};

export default WaitingRoom;
