import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../api';
import { current } from '../../../../state';

const TeacherDashboardRumbleCard = ({
  section,
  rumble,
}: ITeacherDashboardRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);

  // Memoize the minutes and hours to reduce calculations
  const hours = useMemo(() => Math.floor(rumble.numMinutes / 60), [rumble]);
  const mins = useMemo(() => rumble.numMinutes % 60, [rumble]);
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
    setCurrentRumble(rumble);
    setCurrentSection(section);
    push('/dashboard/teacher/rumble', { section, rumble });
  };

  return (
    <div className="rumble-card" onClick={openCurrentRumble}>
      <div className="content">
        <h3>Class Name</h3>
        <h4>{rumble.sectionName}</h4>
      </div>
      <div className="content">
        <h3>Status</h3>
        <h4>{rumble.end_time ? 'Active' : 'Scheduled'}</h4>
      </div>
      <div className="content">
        <h3>Length</h3>
        <h4>{timeDisplay}</h4>
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleCardProps {
  section: Sections.ISectionWithRumbles;
  rumble: Rumbles.IRumbleWithSectionInfo;
}

export default TeacherDashboardRumbleCard;
