import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Rumbles } from '../../../../../../api';
import { useAsync } from '../../../../../../hooks';
import { rumbles } from '../../../../../../state';
import RenderRumbleInactive from './RenderRumbleInactive';

const RumbleInactiveContainer = (): React.ReactElement => {
  const [rumble, updateRumble] = useRecoilState(rumbles.current);

  const [execute] = useAsync({
    asyncFunction: Rumbles.getRumbleById,
    setter: updateRumble,
  });

  // Change this to update the actual end time of the request!
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rumble?.phase === 'INACTIVE') {
      timer = setTimeout(() => {
        execute(rumble.id);
      }, 20000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [rumble]);

  return <RenderRumbleInactive />;
};

export default RumbleInactiveContainer;
