import React from 'react';

const RenderCountDownBox = ({
  title = 'Rumble Timer',
  displayTime,
}: IRenderCountDownBoxProps): React.ReactElement => {
  return (
    <div className="count-down-wrapper">
      <h2>{title}</h2>
      <div className="time-count">{displayTime}</div>
    </div>
  );
};

interface IRenderCountDownBoxProps {
  displayTime: string;
  title?: string;
}

export default RenderCountDownBox;
