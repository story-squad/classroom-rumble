import React from 'react';
import RenderCountDownBox from './RenderCountDownbox';

//Does all the lifting

const CountDownContainer = ({
  title,
  displayTime,
}: ICountDownContainerProps): React.ReactElement => {
  return <RenderCountDownBox title={title} displayTime={displayTime} />;
};

interface ICountDownContainerProps {
  displayTime: string;
  title?: string;
}

export default CountDownContainer;
