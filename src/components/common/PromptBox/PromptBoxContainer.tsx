import React from 'react';
import RenderPromptBox from './RenderPromptBox';

/**
 * The prompt box will live within each students Rumble Game instance.
 */

const PromptBoxContainer = (): React.ReactElement => {
  // Grab prompts from recoil state

  return (
    <div>
      <RenderPromptBox />
    </div>
  );
};

export default PromptBoxContainer;
