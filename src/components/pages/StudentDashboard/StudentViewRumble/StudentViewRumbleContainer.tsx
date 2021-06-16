import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Rumbles } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { rumbles, sections } from '../../../../state';
import { Loader } from '../../../common';
import StudentRumbleRedirect from './StudentRumbleRedirect';

const StudentViewRumbleContainer = (): React.ReactElement => {
  const section = useRecoilValue(sections.current);
  const [rumble, setRumble] = useRecoilState(rumbles.current);

  const [updateRumble, isFetching] = useAsync({
    asyncFunction: Rumbles.getRumbleById,
    setter: setRumble,
  });

  // Change this to update the actual end time of the request!
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rumble?.phase === 'INACTIVE') {
      timer = setTimeout(() => {
        updateRumble(rumble.id);
      }, 20000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [rumble, isFetching]);

  return section && rumble ? (
    <StudentRumbleRedirect section={section} rumble={rumble} />
  ) : (
    <Loader message="Loading rumble" />
  );
};

export default StudentViewRumbleContainer;
