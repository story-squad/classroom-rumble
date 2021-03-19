import React from 'react';
import { Sections, Submissions } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';

const RenderPastRumbleDetails = ({
  submission,
  section,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="past-rumble-details-container">
      <SectionInfo section={section} />
      <PromptBox />
      <div className="rumble-details-submission">{submission}</div>
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submission: Submissions.ISubItem[];
  section: Sections.ISectionWithRumbles;
}

export default RenderPastRumbleDetails;
