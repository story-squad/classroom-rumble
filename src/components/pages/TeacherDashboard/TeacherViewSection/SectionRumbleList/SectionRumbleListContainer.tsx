import React from 'react';
import { useRecoilValue } from 'recoil';
import { rumbles } from '../../../../../state';
import RenderSectionRumbleList from './RenderSectionRumbleList';

const SectionRumbleListContainer = ({
  visible = true,
}: ISectionRumbleListContainerProps): React.ReactElement => {
  const pastRumbleIds = useRecoilValue(rumbles.get({ phases: ['COMPLETE'] }));
  const currentRumbleIds = useRecoilValue(
    rumbles.get({
      phases: ['ACTIVE', 'FEEDBACK', 'INACTIVE'],
    }),
  );

  if (!visible) return <></>;
  return (
    <RenderSectionRumbleList
      pastRumbleIds={pastRumbleIds}
      currentRumbleIds={currentRumbleIds}
    />
  );
};

interface ISectionRumbleListContainerProps {
  visible?: boolean;
}

export default SectionRumbleListContainer;
