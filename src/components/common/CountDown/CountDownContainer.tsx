import React, { useEffect, useState } from 'react';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  endTime,
}: ICountDownContainerProps): React.ReactElement => {
  const calculateTimeLeft = () => {
    const time = endTime;
    const difference = +new Date(`${time}`) - +new Date();
    let timeLeft = { hours: 0, min: 0, sec: 0 };
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60),
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
