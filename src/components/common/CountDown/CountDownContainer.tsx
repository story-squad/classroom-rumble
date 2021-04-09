import React from 'react';
import { IFormattedTimeLeft } from '../../../hooks/useCalculateTimeLeft/useCalculateTimeLeft';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  summedTimeLeft,
  formattedTimeLeft,
}: ICountDownContainerProps): React.ReactElement => {
  return summedTimeLeft ? (
    <RenderCountDownBox
      hours={formattedTimeLeft.hours}
      minutes={formattedTimeLeft.minutes}
      seconds={formattedTimeLeft.seconds}
    />
  ) : (
    <div className="count-down-end">Rumble Over</div>
  );
};

interface ICountDownContainerProps {
  summedTimeLeft: number | undefined;
  formattedTimeLeft: IFormattedTimeLeft;
}

export default CountDownContainer;
