import React from 'react';

const RenderCountDownBox = ({
  displayTime,
}: IRenderCountDownBoxProps): React.ReactElement => {
  return (
    <div className="count-down-wrapper">
      <h2>Rumble Timer</h2>
      <div className="time-count">{displayTime()}</div>
    </div>
  );
};

interface IRenderCountDownBoxProps {
  displayTime: () => string;
}

export default RenderCountDownBox;
