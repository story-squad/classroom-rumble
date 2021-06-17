import React from 'react';
import { Rumbles } from '../../../../api';
import { PromptBox, SectionInfo } from '../../../common';
import { RumbleStudentList } from './RumbleStudentList';

const RenderTeacherViewRumble = ({
  rumble,
  prompt,
}: IRenderTeacherViewRumbleProps): React.ReactElement => {
  // TODO track loading status of rumbles and such?

  return rumble ? (
    <div className="teacher-view-rumble">
      <PromptBox prompt={prompt} isTeacher />
      <SectionInfo sectionId={rumble?.sectionId} />
      <RumbleStudentList rumble={rumble} />
    </div>
  ) : (
    <p>Rumble not found</p>
  );
};

interface IRenderTeacherViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  prompt: string;
}

export default RenderTeacherViewRumble;
