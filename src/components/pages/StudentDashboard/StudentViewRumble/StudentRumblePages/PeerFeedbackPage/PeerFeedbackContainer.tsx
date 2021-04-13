import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../../api';
import { current } from '../../../../../../state';
import { CouldNotLoad, Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const section = useRecoilValue(current.section);
  const rumble = useRecoilValue(current.rumble);
  const student = useRecoilValue(current.student);
  const [error, setError] = useState<null | string>(null);
  const [submissions, setSubmissions] = useState<Submissions.ISubItem[]>();

  useEffect(() => {
    if (rumble?.id && student?.id) {
      Submissions.getSubmissionsForFeedback(rumble.id, student.id)
        .then((res) => {
          setSubmissions(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('There are no user submissions for feedback.');
        });
    }
  }, []);

  return section ? (
    <RenderPeerFeedback section={section} submissions={submissions} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
