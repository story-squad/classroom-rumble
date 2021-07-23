import React from 'react';
import { useRecoilValue } from 'recoil';
import { Rumbles } from '../../../../../api';
import { rumbles } from '../../../../../state';
import RenderSectionRumbleList from './RenderSectionRumbleList';

const SectionRumbleListContainer = ({
  visible = true,
}: ISectionRumbleListContainerProps): React.ReactElement => {
  const pastRumbleIds = useRecoilValue(rumbles.get({ phases: ['COMPLETE'] }));
  const currentRumbleIds = useRecoilValue(
    rumbles.get({
      phases: [
        Rumbles.Phases.WRITING,
        Rumbles.Phases.WAITING,
        Rumbles.Phases.FEEDBACK,
      ],
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
