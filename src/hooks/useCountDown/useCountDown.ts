import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

/**
 * This hook contains logic to receive and endtime and calculate the time left, both formatted and as a summed time in seconds.
 * @param endTime this will be compared to current time to find difference
 * @returns [summedTimeLeft : number, formattedTimeLeft : {hours, minutes, seconds}, calculateTimeLeft : ()]
 */
const useCountDown = (endTime: Date | undefined): [() => string, boolean] => {
  // the difference between the current time and end time in seconds
  const timeInSeconds = DateTime.fromISO(`${endTime}`)
    .diffNow(['second'])
    .toObject().seconds;
  // the current time
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
