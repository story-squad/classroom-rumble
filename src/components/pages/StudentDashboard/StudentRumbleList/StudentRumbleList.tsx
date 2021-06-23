import React from 'react';
import StudentRumble from './StudentRumble';

const RenderStudentRumbleList = ({
  rumbleIds,
}: IRenderStudentRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list">
      {rumbleIds.map((id) => (
        <StudentRumble key={id} rumbleId={id} />
      ))}
    </div>
  );
};

interface IRenderStudentRumbleListProps {
  rumbleIds: number[];
}

export default RenderStudentRumbleList;
