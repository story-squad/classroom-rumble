import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Rumbles, Sections } from '../../../../api';
import { current } from '../../../../state';
import { PastRumbleDetails, SubmissionSuccess } from './StudentRumblePages';
import { StudentSubmissionPage } from './StudentRumblePages/';

const StudentRumbleRedirect = ({
  endTime,
  rumble,
  section,
}: IStudentRumbleRedirectProps): React.ReactElement => {
  const successfulSubmission = useRecoilValue(current.hasSubmitted);
  // TODO - add checks for if the feedback phase has been started and if it's also been completed

  if (isRumbleEnded(`${endTime}`)) {
    return <PastRumbleDetails />;
  } else if (successfulSubmission) {
    // Student has already submitted
    return <SubmissionSuccess />;
  } else {
    // The end time has loaded and the student has not yet submitted
    // This is the view prompt/submit rumble page
    return <StudentSubmissionPage rumble={rumble} section={section} />;
  }
};

interface IStudentRumbleRedirectProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
  endTime: Date;
}

const isRumbleEnded = (endTime: string) =>
  DateTime.fromISO(endTime) <= DateTime.now();

export default StudentRumbleRedirect;
