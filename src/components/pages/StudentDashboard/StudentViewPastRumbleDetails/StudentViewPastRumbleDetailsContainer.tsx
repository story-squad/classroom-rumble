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
  const [submission, setSubmission] = useState<ISubItem[]>();
  const [error, setError] = useState<null | string>(null);

  const rumbleId = rumble?.id;
  const userId = user?.id;

  useEffect(() => {
    console.log('peepee', { rumbleId, userId });
    Students.getSubForRumble(rumbleId as number, userId as number)
      .then((res) => {
        console.log(res);
        setSubmission(res);
      })
      .catch((err) => {
        console.log({ err });
        setError('There is no submission for this Rumble.');
      });
  }, []);

  return submission ? (
    <RenderStudentViewPastRumbleDetails submission={submission} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <>
      <Loader message={'Loading Submission'} />
    </>
  );
};

export default StudentViewPastRumbleDetailsContainer;
