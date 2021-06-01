import React from 'react';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../../../common';

const RenderPastRumbleDetails = ({
  submissionId,
  sectionId,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="view-submission-container">
      <SectionInfo sectionId={sectionId} />
      <PromptBox />
      <FeedbackDisplay submissionId={submissionId} />
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submissionId: number;
  sectionId: number;
}

export default RenderPastRumbleDetails;
