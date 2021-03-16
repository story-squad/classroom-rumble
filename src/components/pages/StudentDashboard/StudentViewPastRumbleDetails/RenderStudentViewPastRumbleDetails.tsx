import React from 'react';
import { PromptBox } from '../../../common';

const RenderStudentViewPastRumbleDetails = (): React.ReactElement => {
  return (
    <div className="past-rumble-details-container">
      <PromptBox />
      <div className="rumble-details-submission">Submission Here</div>
    </div>
  );
};

export default RenderStudentViewPastRumbleDetails;
