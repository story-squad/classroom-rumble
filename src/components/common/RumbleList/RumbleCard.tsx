import React from 'react';
import { Rumbles } from '../../../api';

const TeacherRumble = ({
  numMinutes,
  sectionName,
  id,
  promptId,
  sectionId,
}: Rumbles.IRumbleWithSectionInfo): React.ReactElement => {
  return (
    <div className="rumble-card">
      <h3>{sectionName}</h3>
      <p>ID: {id}</p>
      <p>SectionId: {sectionId}</p>
      <p>PromptID: {promptId}</p>
      <p>This rumble is {numMinutes} minutes long!</p>
    </div>
  );
};

export default TeacherRumble;
