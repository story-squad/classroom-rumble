import React from 'react';
import { Rumbles } from '../../../api';
import RumbleCard from './RumbleCard';

const RumbleList = ({
  rumbles,
  openNewRumbleForm,
}: IRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list-wrapper">
      <h2>Rumbles</h2>
      {openNewRumbleForm && (
        <button onClick={() => openNewRumbleForm(true)}>New Rumble</button>
      )}
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
  openNewRumbleForm?: (arg: boolean) => void;
}

export default RumbleList;
