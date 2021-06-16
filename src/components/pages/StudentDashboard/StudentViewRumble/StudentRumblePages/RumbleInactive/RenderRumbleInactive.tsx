import React from 'react';
import timelady from '../../../../../assets/img/waiting_time.svg';

const RenderRumbleInactive = (): React.ReactElement => {
  return (
    <div className="student-rumble-inactive">
      <img src={timelady} />
      Please Wait For Your Teacher To Start The Rumble
    </div>
  );
};

export default RenderRumbleInactive;
