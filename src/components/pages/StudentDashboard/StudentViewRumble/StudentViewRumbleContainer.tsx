import React from 'react';
import { useRecoilValue } from 'recoil';
import { rumbles } from '../../../../state';
import { Loader } from '../../../common';
import StudentRumbleRedirect from './StudentRumbleRedirect';

const StudentViewRumbleContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(rumbles.current);

  return rumble ? (
    <StudentRumbleRedirect rumble={rumble} />
  ) : (
    <Loader message="Loading rumble" />
  );
};

export default StudentViewRumbleContainer;
