import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRumbleStatus } from '../../../../hooks';
import { rumbles } from '../../../../state';

const TeacherDashboardRumbleCard = ({
  rumbleId,
}: ITeacherDashboardRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const rumble = useRecoilValue(rumbles.getById(rumbleId));
  const setCurrentRumble = useSetRecoilState(rumbles.selected);
  const [status] = useRumbleStatus(rumble);

  // Memoize the minutes and hours to reduce calculations
  const hours = useMemo(
    () => Math.floor((rumble?.numMinutes || 0) / 60),
    [rumble],
  );
  const mins = useMemo(() => (rumble?.numMinutes || 0) % 60, [rumble]);
  const timeDisplay = useMemo(() => {
    let res = '';
    if (hours > 0) {
      res += hours + ' hr';
      if (hours > 1) res += 's';
      if (mins > 0) res += ', ';
    }
    if (mins > 0) {
      res += mins + ' min';
      if (mins > 1) res += 's';
    }
    return res;
  }, [hours, mins]);

  const openCurrentRumble = () => {
    setCurrentRumble(rumbleId);
    push('/dashboard/teacher/rumble');
  };

  return (
    <div className="rumble-card" onClick={openCurrentRumble}>
      <div className="content">
        <h3>Class Name</h3>
        <h4>{rumble?.sectionName}</h4>
      </div>
      <div className="content status">
        <h3>Status</h3>
        <h4>{status}</h4>
      </div>
      <div className="content time">
        <h3>Length</h3>
        <h4>{timeDisplay}</h4>
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleCardProps {
  rumbleId: number;
}

export default TeacherDashboardRumbleCard;
