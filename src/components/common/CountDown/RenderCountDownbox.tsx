import React from 'react';

//Renders Shit

const RenderCountDownBox = ({
  hours,
  minutes,
  seconds,
}: IRenderCountDownBoxProps): React.ReactElement => {
  return (
    <div className="count-down-wrapper">
      <h2>Rumble Timer</h2>
      <div className="time-count">
        {hours < 10 && '0'}
        {hours}:{minutes < 10 && '0'}
        {minutes}:{seconds < 10 && '0'}
        {seconds.toFixed(0)}
      </div>
    </div>
  );
};

interface IRenderCountDownBoxProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default RenderCountDownBox;
