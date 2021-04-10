import React from 'react';
import { Rumbles, Sections } from '../../../../api';
import { PromptBox, SectionInfo } from '../../../common';
import { RumbleStudentList } from './RumbleStudentList';

const RenderTeacherViewRumble = ({
  rumble,
  section,
  prompt,
}: IRenderTeacherViewRumbleProps): React.ReactElement => {
  return (
    <div className="teacher-view-rumble">
      <PromptBox prompt={prompt} rumble={rumble} isTeacher />
      <SectionInfo section={section} />
      <RumbleStudentList section={section} rumble={rumble} />
    </div>
  );
};

interface IRenderTeacherViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
  prompt: string;
}

export default RenderTeacherViewRumble;
