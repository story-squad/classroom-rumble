import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Auth, Sections, Submissions } from '../../../../../../api';
import { Button, PromptBox, SectionInfo } from '../../../../../common';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const RenderPeerFeedback = ({
  section,
  submissions,
  student,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // TODO better type interfaces for form data
  const onSubmit: SubmitHandler<Record<string, unknown>> = (
    data: Record<string, unknown>,
  ) => {
    const body: Record<string, unknown>[] = [];
    const radioValue = Object.values(data);

    // TODO find a more readable way to parse the body
    submissions &&
      radioValue &&
      submissions.forEach((submission) => {
        body.push({
          submissionId: submission?.id,
          voterId: student?.id,
          score1: Number(radioValue.shift()),
          score2: Number(radioValue.shift()),
          score3: Number(radioValue.shift()),
        });
      });
    Submissions.submitFeedback(body);
  };

  return (
    <div className="peer-feedback">
      <SectionInfo section={section} />
      <PromptBox />
      {submissions.length > 0 ? (
        <FormProvider {...methods}>
          <div className="form-wrapper">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {submissions.map((submission, index) => (
                <FeedbackSubmissionCard
                  key={submission.id}
                  submission={submission}
                  subNumber={index + 1}
                />
              ))}
              <div className="button-area">
                <Button disabled={!methods.formState.isValid}>
                  SUBMIT FEEDBACK
                </Button>
              </div>
            </form>
          </div>
        </FormProvider>
      ) : (
        // TODO decide what to display if they don't have feedback assigned
        <></>
      )}
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  submissions: Submissions.ISubItem[];
  student: Auth.IUser;
}

export default RenderPeerFeedback;
