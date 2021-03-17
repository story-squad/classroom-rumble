import React from 'react';
import { Submissions } from '../../../../api';
import { PromptBox } from '../../../common';

const RenderStudentViewPastRumbleDetails = ({
  submission,
}: IRenderStudentViewPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="past-rumble-details-container">
      <PromptBox />
      <div className="rumble-details-submission">{submission}</div>
    </div>
  );
};

interface IRenderStudentViewPastRumbleDetailProps {
  submission: Submissions.ISubItem[];
}

export default RenderStudentViewPastRumbleDetails;
