import React from 'react';
import { Header } from '../../../common';

const RenderStudentWaitingRoom = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="waiting-room-wrapper">
        Please Wait For Your Teacher To Start The Rumble
      </div>
    </>
  );
};

export default RenderStudentWaitingRoom;
