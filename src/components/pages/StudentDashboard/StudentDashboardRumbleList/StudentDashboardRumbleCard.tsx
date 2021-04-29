import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../api';
import time_lady from '../../../../assets/img/waiting_time.svg';
import { current } from '../../../../state';
import { Button } from '../../../common';

const StudentRumble = ({
  section,
  rumble,
}: IStudentDashboardRumbleCardProps): React.ReactElement => {
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

  const status = useMemo(() => {
    switch (rumble.phase) {
      case 'ACTIVE':
      case 'FEEDBACK':
        return 'Active';
      // TODO what should complete say
      case 'COMPLETE':
        return 'Closed';
      case 'INACTIVE':
      default:
        return 'Scheduled';
    }
  }, [rumble]);

  const openCurrentRumble = () => {
    setCurrentRumble(rumble);
    setCurrentSection(section);
    push('/dashboard/student/rumble', { section, rumble });
  };

  console.log(rumble);

  return (
    <div className="rumble-card">
      <div className="content">
        <h3>Class Name</h3>
        <h4>{rumble.sectionName}</h4>
      </div>
      {status !== 'Scheduled' ? (
        <>
          <div className="content">
            <h3>Status</h3>
            <h4>{status}</h4>
          </div>
          <div className="student-button-container">
            <div className="content">
              <h3>Length</h3>
              <h4>{timeDisplay}</h4>
            </div>
            <Button type="primary-with-arrow" onClick={openCurrentRumble}>
              View Rumble
            </Button>
          </div>
        </>
      ) : (
        <div className="scheduled-rumble">
          <img src={time_lady} alt="please wait for teacher to start rumble" />
          <p>Waiting for the teacher to start the rumble.</p>
        </div>
      )}
    </div>
  );
};

interface IStudentDashboardRumbleCardProps {
  section: Sections.ISectionWithRumbles;
  rumble: Rumbles.IRumbleWithSectionInfo;
}
export default StudentRumble;
