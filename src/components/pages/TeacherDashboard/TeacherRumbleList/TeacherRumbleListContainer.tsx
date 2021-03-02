import React from 'react';
import { useRecoilValue } from 'recoil';
import { rumbles } from '../../../../state';
import TeacherRenderRumbleList from './RenderTeacherRumbleList';

const TeacherRumbleListContainer = (): React.ReactElement => {
  const rumbleList = useRecoilValue(rumbles.list);

  return rumbleList ? (
    <TeacherRenderRumbleList rumbles={rumbleList} />
  ) : (
    <p>Loading Rumbles...</p>
  );
};

export default TeacherRumbleListContainer;
