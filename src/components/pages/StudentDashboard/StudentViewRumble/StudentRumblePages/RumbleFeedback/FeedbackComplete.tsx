import React from 'react';
import { useHistory } from 'react-router';
import { useResetRecoilState } from 'recoil';
import rumbleComplete from '../../../../../../assets/img/rumble_complete.svg';
import { rumbles, sections } from '../../../../../../state';
import { Button } from '../../../../../common';

const FeedbackComplete = (): React.ReactElement => {
  const { push } = useHistory();
  const clearSelectedRumble = useResetRecoilState(rumbles.selected);
  const clearSeletedSection = useResetRecoilState(sections.selected);

  // Push user back to dashboard
  const goBack = () => {
    clearSelectedRumble();
    clearSeletedSection();
    push('/dashboard/student');
  };
  const openSubmission = () => push('/dashboard/student/complete');

  return (
    <div className="rumble-complete-wrapper">
      <img src={rumbleComplete} alt="rumble complete" />
      <div className="content">
        <h2>Great job!</h2>
        <p>You completed today&apos;s Rumble</p>
      </div>
      <div className="button-row">
        <Button type="secondary" onClick={openSubmission}>
          View My Submission
        </Button>
        <Button onClick={goBack}>Back to Dashboard</Button>
      </div>
    </div>
  );
};

export default FeedbackComplete;
