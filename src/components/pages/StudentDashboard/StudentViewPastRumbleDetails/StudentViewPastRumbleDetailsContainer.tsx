import React from 'react';
import { Header } from '../../../common';
import RenderStudentViewPastRumbleDetails from './RenderStudentViewPastRumbleDetails';
const StudentViewPastRumbleDetailsContainer = (): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="past-rumble-details-container">
        <RenderStudentViewPastRumbleDetails />
      </div>
    </>
  );
};

export default StudentViewPastRumbleDetailsContainer;
