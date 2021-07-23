import { useMemo } from 'react';
import { Rumbles } from '../../api';

const useRumbleStatus = (
  rumble?: Rumbles.IRumbleWithSectionInfo | undefined,
): ['Active' | 'Complete' | 'Scheduled' | 'Loading'] => {
  const status = useMemo(() => {
    switch (rumble?.phase) {
      case undefined:
        return 'Loading';
      case Rumbles.Phases.WRITING:
      case Rumbles.Phases.FEEDBACK:
        return 'Active';
      // TODO what should complete say
      case Rumbles.Phases.COMPLETE:
        return 'Complete';
      case Rumbles.Phases.WAITING:
      default:
        return 'Scheduled';
    }
  }, [rumble]);
  return [status];
};

export default useRumbleStatus;
