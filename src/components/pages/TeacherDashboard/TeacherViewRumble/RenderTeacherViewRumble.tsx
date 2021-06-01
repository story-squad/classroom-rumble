import React from 'react';
import { useRecoilValue } from 'recoil';
import { rumbles } from '../../../../state';
import { PromptBox, SectionInfo } from '../../../common';
import { RumbleStudentList } from './RumbleStudentList';

const RenderTeacherViewRumble = ({
  rumbleId,
  prompt,
}: IRenderTeacherViewRumbleProps): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.getById(rumbleId));
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
  rumbleId: number;
  prompt: string;
}

export default RenderTeacherViewRumble;
