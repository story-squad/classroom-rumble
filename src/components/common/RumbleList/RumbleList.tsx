import React from 'react';
import { useHistory } from 'react-router-dom';
import { Rumbles } from '../../../api';
import RumbleCard from './RumbleCard';

const RumbleList = ({
  rumbles,
  isTeacher,
}: IRumbleListProps): React.ReactElement => {
  const { push } = useHistory();
  const openNewRumbleForm = () => {
    push('/dashboard/teacher/rumble/new');
  };
  return (
    <div className="rumble-list-wrapper">
      <h2>Rumbles</h2>
      {isTeacher && <button onClick={openNewRumbleForm}>New Rumble</button>}
      <div className="rumble-list">
        {rumbles?.map((r) => (
          <RumbleCard key={r.id} {...r} />
        ))}
      </div>
    </div>
  );
};

interface IRumbleListProps {
  rumbles: Rumbles.IRumbleWithSectionInfo[];
  isTeacher?: boolean;
}

export default RumbleList;
