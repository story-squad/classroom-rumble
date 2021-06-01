import { useMemo } from 'react';
import { Rumbles } from '../../api';

const useRumbleStatus = (
  rumble?: Rumbles.RumblePhases,
): ['Active' | 'Complete' | 'Scheduled' | 'Loading'] => {
  const status = useMemo(() => {
    switch (rumble) {
      case undefined:
        return 'Loading';
      case 'ACTIVE':
      case 'FEEDBACK':
        return 'Active';
      // TODO what should complete say
      case 'COMPLETE':
        return 'Complete';
      case 'INACTIVE':
      default:
        return 'Scheduled';
    }
  }, [rumble]);
  return [status];
};

export default useRumbleStatus;
