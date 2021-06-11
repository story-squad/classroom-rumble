import React from 'react';
import { useRecoilState } from 'recoil';
import { Sections } from '../../../../../api';
import { rumbles } from '../../../../../state';
import { CouldNotLoad } from '../../../../common';
import RenderSectionRumbleList from './RenderSectionRumbleList';

const SectionRumbleListContainer = ({
  section,
  visible = true,
}: ISectionRumbleListContainerProps): React.ReactElement => {
  const [currentRumbles, setCurrentRumbles] = useRecoilState(rumbles.list);

  // Todo: We want to add this in later, but should work without it for now
  // const [setRumbles, isLoading, , error] = useAsync({
  //   asyncFunction: Rumbles.getRumbleById,
  //   setter: setCurrentRumbles,
  // });

  // useEffect(() => {
  //   if (!currentRumbles && !isLoading) setRumbles(section.id);
  // }, [section, currentRumbles]);

  if (!visible) return <></>;
  return currentRumbles ? (
    <RenderSectionRumbleList
      currentRumbles={currentRumbles}
      section={section}
    />
  ) : (
    // ) : error ? (
    //   <CouldNotLoad error={error.message} />
    // ) : isLoading ? (
    //   <Loader message={'Loading Rumbles'} />
    <CouldNotLoad error="Could not load rumbles" />
  );
};

interface ISectionRumbleListContainerProps {
  visible?: boolean;
  section: Sections.ISectionWithRumbles;
}

export default SectionRumbleListContainer;
