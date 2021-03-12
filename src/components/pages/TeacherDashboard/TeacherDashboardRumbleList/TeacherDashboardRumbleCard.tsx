import React from 'react';
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
        <h4>{rumble.numMinutes} minutes</h4>
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleCardProps {
  section: Sections.ISectionWithRumbles;
  rumble: Rumbles.IRumbleWithSectionInfo;
}

export default TeacherDashboardRumbleCard;
