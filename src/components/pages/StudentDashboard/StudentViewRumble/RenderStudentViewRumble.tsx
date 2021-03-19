import React from 'react';
import { Rumbles, Sections } from '../../../../api';
import { PromptBox, SectionInfo } from '../../../common';
import SubmissionForm from './SubmissionForm';

const RenderStudentViewRumble = ({
  section,
}: IRenderStudentViewRumbleProps): React.ReactElement => {
  return (
    <div className="student-view-rumble">
      <SectionInfo section={section} />
      <PromptBox />
      <SubmissionForm />
    </div>
  );
};

interface IRenderStudentViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewRumble;
