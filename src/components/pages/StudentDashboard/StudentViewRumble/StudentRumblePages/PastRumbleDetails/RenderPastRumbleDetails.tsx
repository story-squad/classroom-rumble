import React from 'react';
import { Sections, Submissions } from '../../../../../../api';
import {
  Feedback,
  PromptBox,
  SectionInfo,
  Submission,
} from '../../../../../common';

const RenderPastRumbleDetails = ({
  submission,
  section,
}: IRenderPastRumbleDetailProps): React.ReactElement => {
  console.log(submission);
  return (
    <div className="past-rumble-details-container">
      <SectionInfo section={section} />
      <PromptBox />
      <Feedback />
      <div className="rumble-details-submission">
        {/* {submission.map(({ src }) => {
          <Submission submission={src} />;
          console.log('I AM INSIDE');
        })} */}
        <Submission submission={submission} />
      </div>
    </div>
  );
};

interface IRenderPastRumbleDetailProps {
  submission: Submissions.ISubItem;
  section: Sections.ISectionWithRumbles;
}

export default RenderPastRumbleDetails;
