import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import StudentRumble from './StudentRumble';

const RenderStudentRumbleList = ({
  rumbles,
}: IRenderStudentRumbleListProps): React.ReactElement => {
  return (
    <>
      {rumbles.map((r) => (
        <StudentRumble key={r.id} {...r} />
      ))}
    </>
  );
};

interface IRenderStudentRumbleListProps {
  rumbles: IRumbleWithSectionInfo[];
}

export default RenderStudentRumbleList;
