import React from 'react';
import timelady from '../../../../../../assets/img/waiting_time.svg';
import { Loader } from '../../../../../common';

const RenderRumbleInactive = (): React.ReactElement => {
  return (
    <div className="student-rumble-inactive">
      <img src={timelady} />
      <Loader message="Waiting for teacher to start the rumble" />
    </div>
  );
};

export default RenderRumbleInactive;
