import React from 'react';
import { Rumbles } from '../../../api';
import RumbleCard from './RumbleCard';

const RumbleList = ({ rumbles }: IRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list-wrapper">
      <h2>Rumbles</h2>
      <div className="rumble-list">
        {rumbles.map((r) => (
          <RumbleCard key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
};

interface IRumbleListProps {
  rumbles: Rumbles.IRumbleWithSectionInfo[];
}

export default RumbleList;
