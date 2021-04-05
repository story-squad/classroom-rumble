import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Sections, Submissions } from '../../../../../../api';
import { ISubItem } from '../../../../../../api/Submissions';
import { PromptBox, SectionInfo } from '../../../../../common';
import { FeedbackSubmissionCard } from './FeedbackSubmissionCard';

// TODO - we will eventually need the 3 submissions that are assigned by the DS team in order to render those 3 submissions in a modal for students to read and provide feedback on.

export const ConnectForm = ({ children }) => {
  const methods = useFormContext();
  return children({ ...methods });
};

const RenderPeerFeedback = ({
  section,
}: IRenderPeerFeedbackProps): React.ReactElement => {
  const methods = useForm();
  const [submissions, setSubmissions] = useState<ISubItem[]>([]);
  useEffect(() => {
    Submissions.getSubmissionsForFeedback()
      .then((res) => {
        setSubmissions(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="feedback-wrapper">
      <SectionInfo section={section} />
      <PromptBox />
      <FormProvider {...methods}>
        <div className="submission-list">
          {submissions.map((submission) => (
            <FeedbackSubmissionCard
              key={submission.id}
              submission={submission}
            />
          ))}
        </div>
      </FormProvider>
    </div>
  );
};

interface IRenderPeerFeedbackProps {
  section: Sections.ISectionWithRumbles;
  // submission: Submissions.ISubItem[];
}

export default RenderPeerFeedback;
