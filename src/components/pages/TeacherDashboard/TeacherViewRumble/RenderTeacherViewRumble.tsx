import React from 'react';
import { Rumbles, Sections } from '../../../../api';
import { RumbleStudentList } from './RumbleStudentList';

const RenderTeacherViewRumble = ({
  rumble,
  section,
}: IRenderTeacherViewRumbleProps): React.ReactElement => {
  return (
    <div className="teacher-view-rumble">
      <h2>{section.name}</h2>
      <h3>Prompt {rumble.promptId}</h3>
      <h3>Rumble {rumble.id}</h3>
      <RumbleStudentList section={section} rumble={rumble} />
    </div>
  );
};

interface IRenderTeacherViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RenderTeacherViewRumble;
