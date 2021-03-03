import React from 'react';
import { Rumbles } from '../../../api';

const TeacherRumble = ({
  numMinutes,
  sectionName,
}: Rumbles.IRumbleWithSectionInfo): React.ReactElement => {
  return (
    <div className="rumble-card">
      <h3>{sectionName}</h3>
      <p>This rumble is {numMinutes} minutes long!</p>
    </div>
  );
};

export default TeacherRumble;
