import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Sections, Submissions } from '../../../../../../api';
import { CouldNotLoad, PromptBox, SectionInfo } from '../../../../../common';
import { Loader } from '../../../../../common/Loader';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const RenderPeerFeedback = ({
  section,
  error,
  submissions,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, formState } = useFormContext();

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    console.log(data);
  };

  return submissions ? (
    <div className="feedback-wrapper">
      <SectionInfo section={section} />
      <PromptBox />
      <FormProvider {...methods}>
        <form className="submission-list" onSubmit={handleSubmit(onSubmit)}>
          {submissions.map((submission, index) => (
            <FeedbackSubmissionCard
              key={submission.id}
              submission={submission}
              subNumber={index + 1}
            />
          ))}
          <button disabled={!formState.isValid}>Submit</button>
        </form>
      </FormProvider>
    </div>
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading feedback forms" />
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  // Ask about types for submission and error
  submissions: Submissions.ISubItem[] | undefined;
  error: string | null;
}

export default RenderPeerFeedback;
