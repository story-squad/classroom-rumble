import React from 'react';
import { Rumbles } from '../../../api';
import RumbleCard from './RumbleCard';

const RumbleList = ({ rumbles }: IRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list">
      <h2>Rumbles</h2>
      {rumbles.map((r) => (
        <RumbleCard key={r.id} {...r} />
      ))}
    </div>
  );
};

interface IRumbleListProps {
  rumbles: Rumbles.IRumbleWithSectionInfo[];
}

export default RumbleList;
