import React from 'react';

/**
 * If a student makes it into a rumble there will be a prompt and countdown timer.
 * @param Prompt is a string that is pulled directly from a rumb;e.
 * @returns a submissions form to receive the users image.
 */

const RenderPromptBox = ({
  prompt,
}: IRenderPromptBoxProps): React.ReactElement => {
  return (
    <div className="prompt-box">
      <div className="prompt-and-timer">
        {prompt ? (
          // If there is a prompt then load in the message "Today's Prompt"
          <>
            <h2>Prompt</h2>
            <p>{prompt}</p>
          </>
        ) : (
          // Since prompts are not closing ever we are going to display today's prompt at
          <>
            <p>Loading Prompt...</p>
          </>
        )}
        <p className="countdown-display">Time Left to Submit HERE!</p>
      </div>
    </div>
  );
};

interface IRenderPromptBoxProps {
  prompt: string;
}

export default RenderPromptBox;
