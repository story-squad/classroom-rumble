import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';

const StudentRumble = ({
  numMinutes,
  sectionName,
}: IRumbleWithSectionInfo): React.ReactElement => {
  return (
    <div className="rumble-item">
      <h3>{sectionName}</h3>
      <p>This rumble is {numMinutes} minutes long!</p>
    </div>
  );
};

export default StudentRumble;
