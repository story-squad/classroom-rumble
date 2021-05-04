import React from 'react';
import { Sections, Submissions } from '../../../../../../api';
import { Feedback, PromptBox, SectionInfo } from '../../../../../common';

const RenderPastRumbleDetails = ({
  submission,
  section,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  console.log(submission);
  return (
    <div className="view-submission-container">
      <SectionInfo section={section} />
      <PromptBox />
      <Feedback submission={submission} />
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submission: Submissions.ISubItem;
  section: Sections.ISectionWithRumbles;
}

export default RenderPastRumbleDetails;
