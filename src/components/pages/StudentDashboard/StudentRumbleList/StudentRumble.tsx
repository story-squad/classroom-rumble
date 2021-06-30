import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import time_lady from '../../../../assets/img/waiting_time.svg';
import { useAsync, useRumbleStatus } from '../../../../hooks';
import { rumbles, sections } from '../../../../state';

const StudentRumble = ({
  rumbleId,
}: {
  rumbleId: number;
}): React.ReactElement => {
  const { push } = useHistory();
  const rumble = useRecoilValue(rumbles.getById(rumbleId));
  const setCurrentRumble = useSetRecoilState(rumbles.selected);
  const setCurrentSection = useSetRecoilState(sections.selected);
  const [status] = useRumbleStatus(rumble);

  const [getPrompts, , prompt] = useAsync({
    asyncFunction: Prompts.getPromptById,
  });

  useEffect(() => {
    if (!prompt && rumble) {
      getPrompts(rumble.promptId);
    }
  }, [rumble, rumble?.promptId]);

  const openRumble = () => {
    setCurrentRumble(rumbleId);
    setCurrentSection(rumble?.sectionId);
    // When a student opens up a past rumble we want them to view their details for that rumble.
    push('/dashboard/student/rumble');
  };

  // TODO think about loading state for the prompt

  return (
    <div className="rumble-item" onClick={openRumble}>
      <div className="content">
        {status !== 'Scheduled' ? (
          <>
            <h3>Prompt</h3>
            <h4>{prompt?.prompt}</h4>
          </>
        ) : (
          <div className="scheduled-rumble">
            <img
              src={time_lady}
              alt="please wait for teacher to start rumble"
            />
            <p>Waiting for the teacher to start the rumble.</p>
          </div>
        )}
      </div>

      {status === 'Active' && <div className="button-container"></div>}

      {status === 'Complete' && <div className="button-container"></div>}
    </div>
  );
};

export default StudentRumble;
