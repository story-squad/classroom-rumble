import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Rumbles } from '../../../../api';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import { Loader } from '../../../common';
import RenderStudentViewRumble from './RenderStudentViewRumble';
import RenderStudentWaitingRoom from './RenderStudentWaitingRoom';

const StudentViewRumbleContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'rumble');
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const [endTime, setEndTime] = useState<Date | undefined>(rumble?.end_time);
  const [isFetching, setIsFetching] = useState(false);
  const successfulSubmission = useRecoilState(current.hasSubmitted);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Time');
      if (rumble?.id) {
        setIsFetching(true);
        Rumbles.getRumbleById(rumble.id)
          .then((res) => {
            console.log(res);
            setIsFetching(false);
            if (res.end_time) {
              setEndTime(res.end_time);
            }
          })
          .catch((err) => {
            setIsFetching(false);
            console.log(err);
          });
      }
    }, 20000);
    return () => {
      clearTimeout(timer);
    };
  }, [rumble, isFetching]);

  // Rumble End time needs too be checked by api call
  return section && rumble ? (
    endTime ? (
      <RenderStudentViewRumble rumble={rumble} section={section} />
    ) : (
      <RenderStudentWaitingRoom />
    )
  ) : isLoading ? (
    <Loader message="Loading rumble" />
  ) : (
    <p>Redirecting...</p>
  );
};

export default StudentViewRumbleContainer;
