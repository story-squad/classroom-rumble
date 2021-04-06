import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Sections } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';
import FeedbackSubmissionList from './FeedbackSubmissionList';

// TODO - we will eventually need the 3 submissions that are assigned by the DS team in order to render those 3 submissions in a modal for students to read and provide feedback on.

const RenderPeerFeedback = ({
  section,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm();

  return (
    <div className="feedback-wrapper">
      <SectionInfo section={section} />
      <PromptBox />
      <FormProvider {...methods}>
        <FeedbackSubmissionList />
      </FormProvider>
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  // submission: Submissions.ISubItem[];
}

export default RenderPeerFeedback;
