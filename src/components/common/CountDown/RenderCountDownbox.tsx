import React from 'react';

//Renders Shit

const RenderCountDownBox = ({
  hours,
  minutes,
  seconds,
}: IRenderCountDownBoxProps): React.ReactElement => {
  return (
    <div>
      <h2>Rumble Timer</h2>
      {hours < 10 && '0'}
      {hours}:{minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
};

interface IRenderCountDownBoxProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default RenderCountDownBox;
