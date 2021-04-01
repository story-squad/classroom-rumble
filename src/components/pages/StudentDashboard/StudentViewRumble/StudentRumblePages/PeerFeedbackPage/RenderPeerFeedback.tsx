import React from 'react';
import { Sections } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';
// TODO - we will eventually need the 3 submissions that are assigned by the DS team in order to render those 3 submissions in a modal for students to read and provide feedback on.

const RenderPeerFeedback = ({
  section,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  return (
    <div className="feedback-wrapper">
      <SectionInfo section={section} />
      <PromptBox />
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  //   submission: Submissions.ISubItem[];
}

export default RenderPeerFeedback;
