import { DateTime } from 'luxon';
import { useState } from 'react';

/**
 *
 * @param endTime this will be compared to current time to find difference
 * @returns [summedTimeLeft : number, formattedTimeLeft : {hours, minutes, seconds}, calculateTimeLeft : ()]
 */
const useCalculateTimeLeft = (
  endTime: Date | undefined,
): readonly [number | undefined, IFormattedTimeLeft, () => void] => {
  const [summedTimeLeft, setSummedTimeLeft] = useState<number>();
  const [
    formattedTimeLeft,
    setFormattedTimeLeft,
  ] = useState<IFormattedTimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  //calculates time left with luxon, then sets a formatted (h, m, s) and accumulated version (in seconds) to states
  const calculateTimeLeft = () => {
    const difference = DateTime.fromISO(`${endTime}`).diffNow([
      'hours',
      'minutes',
      'second',
    ]);

    const total =
      difference.seconds + difference.minutes * 60 + difference.hours * 60 ** 2;
    if (total > 0) {
      setSummedTimeLeft(Math.ceil(total));
      setFormattedTimeLeft({
        hours: difference.hours,
        minutes: difference.minutes,
        seconds: difference.seconds,
      });
    } else if (total <= 0) {
      setSummedTimeLeft(0);
      setFormattedTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  return [summedTimeLeft, formattedTimeLeft, calculateTimeLeft] as const;
};

export interface IFormattedTimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default useCalculateTimeLeft;
