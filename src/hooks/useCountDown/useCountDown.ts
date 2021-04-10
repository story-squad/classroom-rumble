import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

/**
 * This hook is intended to receive an endTime and be used to display a countdown.  It's very untuitive to use
 * @param endTime this will be passed into fromISO(), so must be typed/formatted appropriately
 * @returns [display : () => string (hh:mm:ss), finished : boolean]
 */
const useCountDown = (endTime: Date | undefined): [() => string, boolean] => {
  // the difference between the current time and end time in seconds
  const timeInSeconds = DateTime.fromISO(`${endTime}`)
    .diffNow(['second'])
    .toObject().seconds;

  const currentTime = DateTime.local().set({ millisecond: 0 });
  const [now, setNow] = useState(currentTime);
  const [end, setEnd] = useState(currentTime.plus({ seconds: timeInSeconds }));
  // this gets initialized to a standard countdown, and ends whenever the end time has been reached
  const [tick, setTick] = useState<NodeJS.Timeout>(
    setTimeout(() => {
      () => null;
    }, 0),
  );

  // returns boolean if countdown is finished
  const finished = () => {
    return now >= end;
  };

  // calculates remaining time
  const remaining = () => {
    return end.diff(now).toObject();
  };

  // this is the time (in hh:mm:ss) to display
  const display = () => {
    return Duration.fromObject(remaining()).toFormat('hh:mm:ss');
  };

  /**
   * Initializes tick
   * updates "now" state every second until interval is cleared
   */
  useEffect(() => {
    setTick(
      setInterval(() => {
        setNow(DateTime.local().set({ millisecond: 0 }));
      }, 1000),
    );
    setEnd(currentTime.plus({ seconds: timeInSeconds }));
  }, [endTime]);

  /**
   * Clears interval when finished is true (now >= end), stopping ticking
   */
  useEffect(() => {
    if (finished()) {
      clearInterval(tick);
    }
  }, [now]);

  return [display, finished()];
};

export default useCountDown;
