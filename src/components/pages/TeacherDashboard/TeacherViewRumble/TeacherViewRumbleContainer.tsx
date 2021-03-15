import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Prompts } from '../../../../api';
import { useCheckBrowserState } from '../../../../hooks';
import { current } from '../../../../state';
import RenderTeacherViewRumble from './RenderTeacherViewRumble';

const TeacherViewRumbleContainer = (): React.ReactElement => {
  const { isLoading } = useCheckBrowserState('section', 'rumble');
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const [prompt, setPrompt] = useState<string>();
  const [promptIsLoading, setPromptIsLoading] = useState(true);

  useEffect(() => {
    if (rumble)
      Prompts.getPromptById(rumble.promptId)
        .then((res) => {
          setPrompt(res);
          setPromptIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPromptIsLoading(false);
        });
  }, [rumble]);

  return section && rumble && prompt && !isLoading && !promptIsLoading ? (
    <RenderTeacherViewRumble
      rumble={rumble}
      section={section}
      prompt={prompt}
    />
  ) : isLoading || promptIsLoading ? (
    <p>Loading...</p>
  ) : (
    <p>Redirecting...</p>
  );
};

export default TeacherViewRumbleContainer;
