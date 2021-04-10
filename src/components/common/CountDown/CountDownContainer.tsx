import React from 'react';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  displayTime,
  isCountDownFinished,
}: ICountDownContainerProps): React.ReactElement => {
  return isCountDownFinished ? (
    <div className="count-down-end">Rumble Over</div>
  ) : (
    <RenderCountDownBox displayTime={displayTime} />
  );
};

interface ICountDownContainerProps {
  displayTime: () => string;
  isCountDownFinished: boolean;
}

export default CountDownContainer;
