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
    push('/dashboard/student/rumble', { rumble: currentRumble });
  };
  return (
    <div className="rumble-item" onClick={openRumble}>
      <h3>{sectionName}</h3>
      <p>This rumble is {numMinutes} minutes long!</p>
    </div>
  );
};

export default StudentRumble;
