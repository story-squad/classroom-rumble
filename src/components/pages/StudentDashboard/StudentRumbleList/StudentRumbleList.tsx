import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import StudentRumble from './StudentRumble';

const RenderStudentRumbleList = ({
  rumbles,
}: IRenderStudentRumbleListProps): React.ReactElement => {
  return (
    <>
      {/* <div className="rumble-list-wrapper"> */}
      {/* Is this h2 needed? */}
      {/* <h2>Rumbles</h2> */}
      {rumbles.map((r) => (
        <StudentRumble key={r.id} {...r} />
      ))}
      {/* </div> */}
    </>
  );
};

interface IRenderStudentRumbleListProps {
  rumbles: IRumbleWithSectionInfo[];
}

export default RenderStudentRumbleList;
