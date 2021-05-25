import React from 'react';
import { Feedback, Sections, Submissions } from '../../../../../../api';
import { FeedbackDisplay, PromptBox, SectionInfo } from '../../../../../common';

const RenderPastRumbleDetails = ({
  submission,
  section,
  questions,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  return (
    <div className="view-submission-container">
      <SectionInfo section={section} />
      <PromptBox />
      <FeedbackDisplay submission={submission} questions={questions} />
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submission: Submissions.ISubItem;
  section: Sections.ISectionWithRumbles;
  questions: Feedback.IFeedbackQuestions[];
}

export default RenderPastRumbleDetails;
