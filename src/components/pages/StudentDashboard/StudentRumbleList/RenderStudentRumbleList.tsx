import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import StudentRumble from './StudentRumble';

const RenderStudentRumbleList = ({
  rumbles,
}: IRenderStudentRumbleListProps): React.ReactElement => {
  console.log(rumbles);
  return (
    <div className="rumble-list">
      <h2>Rumbles</h2>
      {rumbles.map((r) => (
        <StudentRumble key={r.id} {...r} />
      ))}
    </div>
  );
};

interface IRenderStudentRumbleListProps {
  rumbles: IRumbleWithSectionInfo[];
}

export default RenderStudentRumbleList;
