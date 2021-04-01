import React from 'react';
import { useRecoilValue } from 'recoil';
import { current } from '../../../../../../state';
import { Loader } from '../../../../../common';
import RenderPeerFeedback from './RenderPeerFeedback';

const PeerFeedbackContainer = (): React.ReactElement => {
  const section = useRecoilValue(current.section);

  return section ? (
    <RenderPeerFeedback section={section} />
  ) : (
    <Loader message={'Loading Feedback'} />
  );
};

export default PeerFeedbackContainer;
