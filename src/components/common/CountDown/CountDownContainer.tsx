import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  endTime,
}: ICountDownContainerProps): React.ReactElement => {
  const calculateTimeLeft = () => {
    const difference = DateTime.fromISO(`${endTime}`).diffNow([
      'hours',
      'minutes',
      'second',
    ]);
    let timeLeft = {
      hours: 0,
      min: 0,
      sec: 0,
    };
    if (difference.valueOf() > 0) {
      timeLeft = {
        hours: difference.hours,
        min: difference.minutes,
        sec: difference.seconds,
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [total, setTotal] = useState<number>();

  const sum = (a: number, b: number, c: number) => {
    const totalTime = a + b + c;
    setTotal(totalTime);
  };

  useEffect(() => {
    sum(timeLeft.hours, timeLeft.min, timeLeft.sec);
    let timer: NodeJS.Timeout;
    //Stops timer once it reaches 0
    if (total !== 0) {
      timer = setTimeout(() => {
        // console.log(timeLeft);
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearTimeout(timer);
  });

  return total ? (
    <RenderCountDownBox
      hours={timeLeft.hours}
      minutes={timeLeft.min}
      seconds={timeLeft.sec}
    />
  ) : (
    <div className="count-down-end">Rumble Over</div>
  );
};

interface ICountDownContainerProps {
  endTime?: Date;
}

export default CountDownContainer;
