import React, { useState } from 'react';
import { StudentViewRumble } from './index';

const RenderStudentViewRumble = (): React.ReactElement => {
  const [time, setTime] = useState(true);
  if (!time) {
    setTimeout(() => {
      console.log('Time');
      console.log(time);
    }, 15000);
  } else {
    clearTimeout();
  }

  return <>{time ? <div>Show Promopt</div> : <StudentViewRumble />}</>;
};

export default RenderStudentViewRumble;
