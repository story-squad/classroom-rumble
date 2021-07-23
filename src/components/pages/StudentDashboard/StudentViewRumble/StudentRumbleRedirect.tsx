import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Rumbles, Students } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { auth, submissions } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import {
  RumbleActive,
  RumbleComplete,
  RumbleFeedback,
  RumbleInactive,
} from './StudentRumblePages';

const StudentRumbleRedirect = ({
  rumble,
}: IStudentRumbleRedirectProps): React.ReactElement => {
  const user = useRecoilValue(auth.user);
  const [selectedSub, setSelectedSub] = useRecoilState(submissions.current); // This feels wrong
  const addSubmissions = useSetRecoilState(submissions.add);
  const setSubIdForRumble = useSetRecoilState(
    submissions.getIdByRumbleAndUser({
      rumbleId: rumble?.id,
      userId: user?.id,
    }),
  );

  const [execute, loading, , error] = useAsync({
    asyncFunction: Students.getSubForRumble,
    setter: (sub) => {
      addSubmissions(sub);
      setSubIdForRumble(sub?.id);
      setSelectedSub(sub);
    },
  });

  useEffect(() => {
    if (
      !selectedSub &&
      rumble &&
      user &&
      rumble.phase !== Rumbles.Phases.WAITING
    ) {
      execute(rumble.id, user.id);
    }
  }, [rumble, selectedSub, user]);

  const render = () => {
    if (loading) return <Loader />;
    switch (rumble.phase) {
      case 'WAITING':
        return <RumbleInactive />;
      case 'WRITING':
        return <RumbleActive />;
      case 'FEEDBACK':
        return <RumbleFeedback />;
      case 'COMPLETE':
        return <RumbleComplete />;
      default:
        if (error) return <CouldNotLoad error={error} />;
        else return <CouldNotLoad error="Could not load rumble" />;
    }
  };

  return render();
};

interface IStudentRumbleRedirectProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
}

export default StudentRumbleRedirect;
