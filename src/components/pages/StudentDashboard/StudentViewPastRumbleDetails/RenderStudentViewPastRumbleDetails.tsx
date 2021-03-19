import React from 'react';
import { Sections, Submissions } from '../../../../api';
import { PromptBox, SectionInfo } from '../../../common';

const RenderStudentViewPastRumbleDetails = ({
  submission,
  section,
}: IRenderStudentViewPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="past-rumble-details-container">
      <SectionInfo section={section} />
      <PromptBox />
      <div className="rumble-details-submission">{submission}</div>
    </div>
  );
};

interface IRenderStudentViewPastRumbleDetailProps {
  submission: Submissions.ISubItem[];
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewPastRumbleDetails;
