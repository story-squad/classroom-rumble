import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Feedback } from '../../../api';
import { IFeedback } from '../../../api/Feedback';
import { auth, current } from '../../../state';

const RenderFeedback = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const student = useRecoilValue(auth.user);
  const [feedback, setFeedback] = useState<IFeedback[]>();

  useEffect(() => {
    if (rumble?.id && student?.id) {
      // To test remove rumble and student id from params and comment out the call in feedback.ts
      // uncomment and return dummydata then click on rumble
      Feedback.getSubmissionFeedback(rumble.id, student.id)
        .then((res) => {
          console.log(res);
          setFeedback(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rumble, student]);
  console.log(feedback);

  return <div className="feedback-wrapper">Hey I am Feedback</div>;
};

export default RenderFeedback;
