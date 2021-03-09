import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'rumble');
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);

  return section && rumble ? (
    <RenderTeacherViewRumble rumble={rumble} section={section} />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewRumbleContainer;
