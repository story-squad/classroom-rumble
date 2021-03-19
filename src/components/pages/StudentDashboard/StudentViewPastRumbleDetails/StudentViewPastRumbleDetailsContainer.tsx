import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Students } from '../../../../api';
import { ISubItem } from '../../../../api/Submissions';
import { auth, current } from '../../../../state';
import { CouldNotLoad, Loader } from '../../../common';
import RenderStudentViewPastRumbleDetails from './RenderStudentViewPastRumbleDetails';

const StudentViewPastRumbleDetailsContainer = (): React.ReactElement => {
  const rumble = useRecoilValue(current.rumble);
  const user = useRecoilValue(auth.user);
  const section = useRecoilValue(current.section);

  const [submission, setSubmission] = useState<ISubItem[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    console.log('rumbleId & userId: ', {
      rumbleId: rumble?.id,
      userId: user?.id,
    });

    if (rumble && user && !submission) {
      Students.getSubForRumble(rumble.id, user.id)
        .then((res) => {
          console.log(res);
          setSubmission(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('There is no submission for this Rumble.');
        });
    }
  }, [rumble, user]);

  return submission ? (
    <RenderStudentViewPastRumbleDetails
      section={section}
      submission={submission}
    />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <>
      <Loader message={'Loading Submission'} />
    </>
  );
};

export default StudentViewPastRumbleDetailsContainer;
