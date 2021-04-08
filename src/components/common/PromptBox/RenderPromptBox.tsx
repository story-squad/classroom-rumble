import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { CountDown } from '../CountDown';

/**
 * If a student makes it into a rumble there will be a prompt and countdown timer.
 * @param Prompt is a string that is pulled directly from a rumb;e.
 * @returns a submissions form to receive the users image.
 */

const RenderPromptBox = ({
  prompt,
  endTime,
  isTeacher,
  startRumble,
}: IRenderPromptBoxProps): React.ReactElement => {
  const [date, weekday] = useFormatDate(`${endTime || ''}`);
  // const [date, weekday] = useFormatDate('');
  return (
    <div className="prompt-info-wrapper">
      <div className="prompt-info-container">
        <div className="prompt-info-content">
          {endTime && (
            <div className="end-time-large">
              <div className="day">{weekday}</div>
              <div className="date">{date}</div>
            </div>
          )}
          <div className="prompt-text">
            <h2>Prompt</h2>
            {date && weekday && (
              <div className="end-time-small">
                {date} {weekday}
              </div>
            )}
            <p>{prompt}</p>
          </div>
          {/* THIS NEEDS WORK */}
          {isTeacher && !endTime ? (
            <div className="start-rumble-button">
              <button onClick={startRumble}>Start Rumble</button>
            </div>
          ) : !endTime ? (
            //back to studentdashboard
            <>Redirecting ... </>
          ) : (
            <div>
              <CountDown endTime={endTime} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const useFormatDate = (
  date: string | undefined,
): [date: string | undefined, weekday: string | undefined] => {
  const luxonDate = useMemo(() => DateTime.fromISO(date || ''), [date]);

  return luxonDate.isValid
    ? [
        luxonDate.toLocaleString(DateTime.DATE_SHORT),
        luxonDate.toLocaleString({ weekday: 'long' }),
      ]
    : [undefined, undefined];
};

interface IRenderPromptBoxProps {
  prompt: string;
  endTime?: Date;
  isTeacher: boolean;
  startRumble?: () => void;
}

export default RenderPromptBox;
