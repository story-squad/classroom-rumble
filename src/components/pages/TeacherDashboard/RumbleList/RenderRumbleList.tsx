import React from 'react';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import RumbleItem from './RumbleItem';

const RenderRumbleList = ({
  rumbles,
}: IRenderRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list">
      <h2>Rumbles</h2>
      {rumbles.map((r) => (
        <RumbleItem key={r.id} {...r} />
      ))}
    </div>
  );
};

interface IRenderRumbleListProps {
  rumbles: IRumbleWithSectionInfo[];
}

export default RenderRumbleList;
