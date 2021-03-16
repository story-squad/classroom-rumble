import React from 'react';
import { Rumbles, Sections } from '../../../../api';
import { Header, PromptBox, SectionInfo } from '../../../common';
import SubmissionForm from './SubmissionForm';

const RenderStudentViewRumble = ({
  section,
}: IRenderStudentViewRumbleProps): React.ReactElement => {
  return (
    <>
      <Header />
      <div className="student-view-rumble">
        <SectionInfo section={section} />
        <PromptBox />
        <SubmissionForm />
      </div>
    </>
  );
};

interface IRenderStudentViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RenderStudentViewRumble;
