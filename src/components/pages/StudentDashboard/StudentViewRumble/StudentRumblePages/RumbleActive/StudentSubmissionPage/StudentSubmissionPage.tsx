import React from 'react';
import { useRecoilValue } from 'recoil';
import { sections } from '../../../../../../../state';
import { PromptBox, SectionInfo } from '../../../../../../common';
import SubmissionForm from './SubmissionForm';

const RenderStudentViewRumble = (): React.ReactElement => {
  // It should always be set when the user sees this page
  const sectionId = useRecoilValue(sections.selected);
  return (
    <div className="student-view-rumble">
      <SectionInfo sectionId={sectionId as number} />
      <PromptBox />
      <SubmissionForm />
    </div>
  );
};

export default RenderStudentViewRumble;
