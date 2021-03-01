import React from 'react';
import { useRecoilValue } from 'recoil';
import { rumbles } from '../../../../state';
import RenderRumbleList from './RenderRumbleList';

const RumbleListContainer = (): React.ReactElement => {
  const rumbleList = useRecoilValue(rumbles.list);
  return rumbleList ? (
    <RenderRumbleList rumbles={rumbleList} />
  ) : (
    <p>Loading Rumbles...</p>
  );
};

export default RumbleListContainer;
