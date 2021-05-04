import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { IRumbleWithSectionInfo } from '../../../../api/Rumbles';
import time_lady from '../../../../assets/img/waiting_time.svg';
import { useAsync, useRumbleStatus } from '../../../../hooks';
import { current } from '../../../../state';
import { Button } from '../../../common';

const StudentRumble = ({
  numMinutes,
  sectionName,
  ...rumbleInfo
}: IRumbleWithSectionInfo): React.ReactElement => {
  const { push } = useHistory();
  const currentSection = useRecoilValue(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);
  const [status] = useRumbleStatus(rumbleInfo.phase);

  const [getPrompts, loading, prompt, error] = useAsync({
    asyncFunction: Prompts.getPromptById,
  });

  useEffect(() => {
    if (!prompt) {
      getPrompts(rumbleInfo.promptId);
    }
  }, [rumbleInfo.promptId]);

  console.log({ prompt });

  const openRumble = () => {
    // Set current rumble BEFORE pushing the user to /dashboard/student/rumble
    const currentRumble = {
      numMinutes,
      sectionName,
      ...rumbleInfo,
    };
    console.log({ currentSection, currentRumble });
    setCurrentRumble(currentRumble);
    // When a student opens up a past rumble we want them to view their details for that rumble.
    push('/dashboard/student/rumble', {
      rumble: currentRumble,
      section: currentSection,
    });
  };
  return (
    <div className="rumble-item">
      <div className="content">
        {status !== 'Scheduled' ? (
          <>
            <h3>Prompt</h3>
            <h4>{prompt}</h4>
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
      {status !== 'Scheduled' && (
        <div className="button-container">
          <Button type="secondary" onClick={openRumble}>
            {rumbleInfo.end_time ? 'View Rumble' : 'View Details'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentRumble;
