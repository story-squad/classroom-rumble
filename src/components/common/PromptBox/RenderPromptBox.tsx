import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { Rumbles } from '../../../api';
import { useCountDown } from '../../../hooks';
import { Button } from '../Button';
import { CountDown } from '../CountDown';

/**
 * If a student makes it into a rumble there will be a prompt and countdown timer.
 * @param Prompt is a string that is pulled directly from a rumble.
 * @returns a submissions form to receive the users image.
 */

const RenderPromptBox = ({
  prompt,
  phase,
  endTime,
  startTime,
  isTeacher,
  startRumble,
  startFeedback,
}: IRenderPromptBoxProps): React.ReactElement => {
  const [date, weekday] = useFormatDate(`${endTime || ''}`);
  const [countDownToEnd, isCountDownFinished] = useCountDown(endTime);
  const [countDownToStart, isStartTimeOver] = useCountDown(startTime as Date);

  const render = () => {
    return phase === Rumbles.Phases.WAITING ? (
      isTeacher ? (
        <div className="start-phase-button">
          <Button type="secondary" onClick={startRumble}>
            Start Rumble
          </Button>
          {startTime && !isStartTimeOver && (
            <CountDown title="Starts In" displayTime={countDownToStart} />
          )}
        </div>
      ) : (
        //back to studentdashboard when there's no end time and you're not a teacher
        <>An error has occurred... </>
      )
    ) : isCountDownFinished ? (
      phase === Rumbles.Phases.COMPLETE ? (
        <div className="count-down-end">Rumble Over</div>
      ) : phase === Rumbles.Phases.WRITING && isTeacher ? (
        <div className="start-phase-button">
          <Button type="secondary" onClick={startFeedback}>
            Start Feedback
          </Button>
        </div>
      ) : (
        phase === Rumbles.Phases.FEEDBACK && (
          <div className="count-down-end">Feedback Phase Started</div>
        )
      )
    ) : (
      <CountDown displayTime={countDownToEnd} />
    );
  };

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
          {render()}
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
  phase: Rumbles.RumblePhases | undefined;
  startTime?: string | Date;
  endTime?: Date;
  isTeacher: boolean;
  startRumble?: () => void;
  startFeedback?: () => void;
}

export default RenderPromptBox;
