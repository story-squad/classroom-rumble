import { useMemo } from 'react';
import { Rumbles } from '../../api';

const useRumbleFilter = (
  rumbles: Rumbles.IRumbleWithSectionInfo[],
): [
  currentRumbles: Rumbles.IRumbleWithSectionInfo[],
  pastRumbles: Rumbles.IRumbleWithSectionInfo[],
] => {
  const currentRumbles = useMemo(
    () => rumbles.filter((rumble) => rumble.phase !== `COMPLETE`),
    [rumbles],
  );
  const pastRumbles = useMemo(
    () => rumbles.filter((rumble) => rumble.phase === `COMPLETE`),
    [rumbles],
  );
  return [currentRumbles, pastRumbles];
};

export default useRumbleFilter;
