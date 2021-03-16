import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../api';
import { current, prompts, submitModal } from '../../../../state';
import { upload } from '../../../../utils';

/**
 * Submission Form allows students to submit an image to the rumble they are currenly in.
 */

const SubmissionForm = (): React.ReactElement => {
  // Recoil State for user submissions
  const [file, setFile] = useRecoilState(submitModal.selected);
  const [preview, setPreview] = useRecoilState(submitModal.preview);
  const [error, setError] = useRecoilState(submitModal.error);
  const [loading, setLoading] = useRecoilState(submitModal.loading);
  const [complete, setComplete] = useRecoilState(submitModal.success);

  // Where are we tracking markAsSubmitted?
  const markAsSubmitted = useSetRecoilState(prompts.setSubmitted);

  // We will always know the rumble if we get this far bc the PromptBox is only rendered within a Rumble.
  const currentRumble = useRecoilValue(current.rumble);
  // Ensuring the promptId is a string before it is uploaded
  const promptId = currentRumble?.promptId.toString();

  // On submit functionality for user stories (submissions)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('No image selected!');
    } else {
      setLoading(true);
      try {
        // Create new FormData instance to track our file and pass it to our API call `submitStory`
        const reqBody = new FormData();
        reqBody.append('story', file);
        // Force Typing as a string bc WE are smarter than our interpereter!!
        reqBody.append('promptId', promptId as string);
        // ALL GOOD TO UPLOAD!
        // POST a submission here
        await Submissions.submitStory(reqBody)
          .then((data) => {
            console.log('File Submitted: ', data);
          })
          .catch((err) => {
            console.log({ err });
          });
        setComplete(true);
        markAsSubmitted(true);
      } catch (err) {
        if (err?.response?.data?.error) {
          if (err.response.data.error === 'Transcription error')
            setError('Picture must be of written text');
          else setError(err.response.data.error);
        } else {
          setError('An error occurred. Try again later');
        }
      }
      setLoading(false);
    }
  };

  const fileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const selection = fileList[0];
      if (selection) {
        if (!upload.isValidImage(selection)) {
          setError('Upload must be an image!');
        } else {
          setError(null);
          setFile(selection);
          setPreview(URL.createObjectURL(selection));
        }
      }
    }
  };

  return (
    <>
      <div className="submission-form">
        <form onSubmit={onSubmit}>
          {preview && (
            <div className="preview">
              <img src={preview} alt="Upload preview" />
              <div className={`loader${loading ? ' visible' : ''}`}>
                <p>** barloader **</p>
              </div>
            </div>
          )}
          {error && <div className="error">{error}</div>}
          {!complete && (
            // If the submission hasn't been processed successfully
            <>
              <label className={file ? 'selected' : ''}>
                {file ? 'Change Picture' : 'Select a Picture'}
                <input type="file" onChange={fileSelection} hidden />
              </label>
              <button type="submit">Submit Your Story</button>
            </>
          )}
        </form>
        {complete && (
          // Once the submission is done, show a button.
          <>
            <div className="success">Submission successful!</div>
          </>
        )}
      </div>
    </>
  );
};

export default SubmissionForm;
