import React from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import { current } from '../../../../state';

const StudentRumble = ({
  numMinutes,
  sectionName,
  ...rumbleInfo
}: IRumbleWithSectionInfo): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentRumble = useSetRecoilState(current.rumble);

  const openRumble = () => {
    // Set current rumble BEFORE pushing the user to /dashboard/student/rumble
    const currentRumble = {
      numMinutes,
      sectionName,
      ...rumbleInfo,
    };
    setCurrentRumble(currentRumble);
    // When a student opens up a past rumble we want them to view their details for that rumble.
    push('/dashboard/student/rumble/details', { rumble: currentRumble });
  };
  return (
    <div className="rumble-item">
      <div className="content">
        <h3>Class Name</h3>
        <h4>{sectionName}</h4>
      </div>
      <div className="content">
        <button onClick={openRumble}>
          {rumbleInfo.end_time ? 'View Rumble' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default StudentRumble;
