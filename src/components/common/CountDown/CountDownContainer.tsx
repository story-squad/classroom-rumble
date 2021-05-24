import React from 'react';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  displayTime,
}: ICountDownContainerProps): React.ReactElement => {
  return <RenderCountDownBox displayTime={displayTime} />;
};

interface ICountDownContainerProps {
  displayTime: string;
}

export default CountDownContainer;
