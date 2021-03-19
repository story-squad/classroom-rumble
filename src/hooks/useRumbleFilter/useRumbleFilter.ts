import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { Rumbles } from '../../api';

const useRumbleFilter = (
  rumbles: Rumbles.IRumbleWithSectionInfo[],
): [
  currentRumbles: Rumbles.IRumbleWithSectionInfo[],
  pastRumbles: Rumbles.IRumbleWithSectionInfo[],
] => {
  const currentRumbles = useMemo(
    () =>
      rumbles.filter(
        (rumble) =>
          !rumble.end_time ||
          DateTime.fromISO(`${rumble.end_time}`) > DateTime.now(),
      ),
    [rumbles],
  );
  const pastRumbles = useMemo(
    () =>
      rumbles.filter(
        (rumble) =>
          rumble.end_time &&
          DateTime.fromISO(`${rumble.end_time}`) < DateTime.now(),
      ),
    [rumbles],
  );
  return [currentRumbles, pastRumbles];
};

export default useRumbleFilter;
