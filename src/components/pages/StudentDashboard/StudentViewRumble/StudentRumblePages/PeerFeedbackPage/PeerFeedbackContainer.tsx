import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../../../api';
import { current } from '../../../../../../state';
import { Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const section = useRecoilValue(current.section);
  const [error, setError] = useState<null | string>(null);
  const [submissions, setSubmissions] = useState<Submissions.ISubItem[]>();

  useEffect(() => {
    Submissions.getSubmissionsForFeedback()
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => {
        console.log({ err });
        setError('There are no user submissions for feedback.');
      });
  }, []);

  return section ? (
    <RenderPeerFeedback
      section={section}
      error={error}
      submissions={submissions}
    />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
