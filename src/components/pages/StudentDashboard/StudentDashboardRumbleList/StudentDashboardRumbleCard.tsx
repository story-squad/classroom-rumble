import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Rumbles } from '../../../../api';
import time_lady from '../../../../assets/img/waiting_time.svg';
import { useRumbleStatus } from '../../../../hooks';
import { rumbles, sections } from '../../../../state';
import { Button } from '../../../common';

const StudentRumble = ({
  rumbleId,
}: IStudentDashboardRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  // TODO find a better way to ensure this is set
  const rumble = useRecoilValue(
    rumbles.getById(rumbleId),
  ) as Rumbles.IRumbleWithSectionInfo;
  const setCurrentSection = useSetRecoilState(sections.selected);
  const setCurrentRumble = useSetRecoilState(rumbles.selected);
  const [status] = useRumbleStatus(rumble.phase);

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
    setCurrentRumble(rumbleId);
    setCurrentSection(rumble?.sectionId);
    push('/dashboard/student/rumble', { rumble });
  };

  return (
    <div className="rumble-card">
      <div className="content">
        <h3>Class Name</h3>
        <h4>{rumble?.sectionName}</h4>
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
  rumbleId: number;
}
export default StudentRumble;
