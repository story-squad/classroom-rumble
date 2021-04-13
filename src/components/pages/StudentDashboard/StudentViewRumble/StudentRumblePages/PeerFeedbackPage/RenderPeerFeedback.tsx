import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Sections, Submissions } from '../../../../../../api';
import { PromptBox, SectionInfo } from '../../../../../common';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const RenderPeerFeedback = ({
  section,
  submissions,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    console.log(data);
  };

  return (
    <div className="feedback-wrapper">
      <SectionInfo section={section} />
      <PromptBox />
      <FormProvider {...methods}>
        {submissions && (
          <form
            className="submission-list"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {submissions.map((submission, index) => (
              <FeedbackSubmissionCard
                key={submission.id}
                submission={submission}
                subNumber={index + 1}
              />
            ))}
            <button disabled={!methods.formState.isValid}>Submit</button>
          </form>
        )}
      </FormProvider>
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  submissions: Submissions.ISubItem[] | undefined;
}

export default RenderPeerFeedback;
