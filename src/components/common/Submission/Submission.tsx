import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { FullscreenImage } from '../FullscreenImage';

const Submission = ({
  submission,
  title,
}: ISubmissionProps): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="submission-wrapper">
      <div className="submission-container">
        {isVisible ? (
          <div className="submission-content">
            {/* I put title here for easier styling -It may be redundent by victors brain is tired and though it was good to put it like this */}
            {title && <h2>{title}</h2>}
            <FullscreenImage
              {...submission}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
            <img
              src={submission.src}
              alt={`Submission by: ${submission.codename}`}
            />
            <a onClick={() => setIsVisible(!isVisible)}>Close</a>
          </div>
        ) : (
          <div className="submission-content">
            {title && <h2>{title}</h2>}
            <img
              src={submission.src}
              alt={`Submission by: ${submission.codename}`}
              onClick={() => setIsVisible(!isVisible)}
            />
            <a onClick={() => setIsVisible(!isVisible)}>View Larger</a>
          </div>
        )}
      </div>
    </div>
  );
};
// ToDO add fullscreen view on click
interface ISubmissionProps {
  submission: Submissions.ISubItem;
  title?: string;
}

export default Submission;
