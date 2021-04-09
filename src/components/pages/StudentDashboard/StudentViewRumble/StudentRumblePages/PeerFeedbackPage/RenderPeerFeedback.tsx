import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Sections } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';
import FeedbackSubmissionList from './FeedbackSubmissionList';

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
}

export default RenderPeerFeedback;
