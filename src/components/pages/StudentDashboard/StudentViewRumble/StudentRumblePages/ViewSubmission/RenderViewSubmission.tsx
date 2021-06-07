import React from 'react';
import { Sections, Submissions } from '../../../../../../api';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../../../common';

const RenderPastRumbleDetails = ({
  submission,
  section,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="view-submission-container">
      <SectionInfo section={section} />
      <PromptBox />
      <FeedbackDisplay submission={submission} />
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submission: Submissions.ISubItem;
  section: Sections.ISectionWithRumbles;
}

export default RenderPastRumbleDetails;
