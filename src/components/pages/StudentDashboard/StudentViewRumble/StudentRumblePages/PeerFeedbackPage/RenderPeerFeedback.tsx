import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Auth, Submissions } from '../../../../../../api';
import { submissions } from '../../../../../../state';
import { Button, PromptBox, SectionInfo } from '../../../../../common';
import FeedbackSubmissionCard from './FeedbackSubmissionCard';

const RenderPeerFeedback = ({
  sectionId,
  student,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submissionIds = useRecoilValue(submissions.ids);

  // TODO better type interfaces for form data
  const onSubmit: SubmitHandler<Record<string, unknown>> = (
    data: Record<string, unknown>,
  ) => {
    const body: Record<string, unknown>[] = [];
    const radioValue = Object.values(data);

    // TODO find a more readable way to parse the body
    submissionIds &&
      radioValue &&
      submissionIds.forEach((id) => {
        body.push({
          submissionId: id,
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
      <SectionInfo sectionId={sectionId} />
      <PromptBox />
      {submissionIds && submissionIds.length > 0 ? (
        <FormProvider {...methods}>
          <div className="form-wrapper">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {submissionIds.map((id, index) => (
                <FeedbackSubmissionCard
                  key={id}
                  submissionId={id}
                  subNumber={index + 1}
                  storyAmount={submissionIds.length}
                />
              ))}
              <div className="button-area">
                <Button disabled={!methods.formState.isValid}>
                  Submit Feedback
                </Button>
              </div>
            </form>
          </div>
        </FormProvider>
      ) : (
        // TODO decide what to display if they don't have feedback assigned
        <p>
          Feedback has not been assigned. Ask your teacher for more details.
        </p>
      )}
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  sectionId: number;
  student: Auth.IUser;
}

export default RenderPeerFeedback;
