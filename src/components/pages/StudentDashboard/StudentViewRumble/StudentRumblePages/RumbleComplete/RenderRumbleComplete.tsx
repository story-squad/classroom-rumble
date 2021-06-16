import React from 'react';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../../../common';

const RenderRumbleComplete = ({
  submissionId,
  sectionId,
}: IRenderRumbleCompleteProps): React.ReactElement => {
  return (
    <div className="view-submission-container">
      <SectionInfo sectionId={sectionId} />
      <PromptBox />
      <FeedbackDisplay submissionId={submissionId} />
    </div>
  );
};

interface IRenderRumbleCompleteProps {
  submissionId: number;
  sectionId: number;
}

export default RenderRumbleComplete;
