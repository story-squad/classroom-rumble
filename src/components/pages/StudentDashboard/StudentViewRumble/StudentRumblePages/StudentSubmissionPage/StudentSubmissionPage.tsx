import React from 'react';
import { PromptBox, SectionInfo } from '../../../../../common';
import SubmissionForm from './SubmissionForm';

const RenderStudentViewRumble = ({
  sectionId,
}: IRenderStudentViewRumbleProps): React.ReactElement => {
  return (
    <div className="student-view-rumble">
      <SectionInfo sectionId={sectionId} />
      <PromptBox />
      <SubmissionForm />
    </div>
  );
};

interface IRenderStudentViewRumbleProps {
  sectionId: number;
}

export default RenderStudentViewRumble;
