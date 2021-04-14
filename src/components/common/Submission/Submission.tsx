import React, { useState } from 'react';
import { Submissions } from '../../../api';
import { FullscreenImage } from '../FullscreenImage';

const Submission = ({ submission }: ISubmissionProps): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="image-wrapper">
      <div className="image-container">
        <h2>SUBMISSION</h2>
        {isVisible ? (
          <>
            <FullscreenImage
              {...submission}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
            <div className="placeholder" />
            <a onClick={() => setIsVisible(!isVisible)}>Close</a>
          </>
        ) : (
          <>
            <img src={submission.src} />
            <a onClick={() => setIsVisible(!isVisible)}>View Larger</a>
          </>
        )}
      </div>
    </div>
  );
};
// ToDO add fullscreen view on click
interface ISubmissionProps {
  submission: Submissions.ISubItem;
}

export default Submission;
