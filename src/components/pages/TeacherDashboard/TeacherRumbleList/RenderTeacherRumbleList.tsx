import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import TeacherRumble from './TeacherRumble';

const RenderTeacherRumbleList = ({
  rumbles,
}: IRenderTeacherRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list">
      <h2>Rumbles</h2>
      {rumbles.map((r) => (
        <TeacherRumble key={r.id} {...r} />
      ))}
    </div>
  );
};

interface IRenderTeacherRumbleListProps {
  rumbles: IRumbleWithSectionInfo[];
}

export default RenderTeacherRumbleList;
