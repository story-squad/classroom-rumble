import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../../api';
import activeUpload from '../../../../../../assets/img/active_upload.svg';
import { app, auth, modals, rumbles } from '../../../../../../state';
import { upload } from '../../../../../../utils';
import { Button, Checkbox } from '../../../../../common';

/**
 * Submission Form allows students to submit an image to the rumble they are currenly in.
 */

const SubmissionForm = (): React.ReactElement => {
  const { errors, register } = useForm({
    mode: 'onChange',
  });

  const userInfo = useRecoilValue(auth.user);

  // Error handling toast notifications
  const { addToast } = useToasts();
  // Recoil State for user submissions
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useRecoilState(app.hasSubmitted);

  // We will always know the rumble if we get this far bc the PromptBox is only rendered within a Rumble.
  const currentRumble = useRecoilValue(rumbles.current);
  // Ensuring the promptId is a string before it is uploaded
  const promptId = currentRumble?.promptId.toString();

  const setParentValidationOpen = useSetRecoilState(
    modals.validationModalIsOpen,
  );
  const openParentValidationModal = () => setParentValidationOpen(true);

  // On submit functionality for user stories (submissions)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      addToast('No image selected!', { appearance: 'error' });
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
      } catch (err) {
        let message: string;
        if (err?.response?.data?.error) {
          // Am not sure how to test this if we even can at the moment
          if (err.response.data.error === 'Transcription error') {
            message = 'Picture must be of written text';
          } else {
            message = err.response.data.error;
          }
        } else {
          message = 'An error occurred. Try again later';
        }
        addToast(message, { appearance: 'error' });
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
          addToast('Upload must be an image!', { appearance: 'error' });
        } else {
          setFile(selection);
          setPreview(URL.createObjectURL(selection));
        }
      }
    }
  };

  return (
    <div className="submission-form-wrapper">
      <div className="submission-form-container">
        <form onSubmit={onSubmit} className="submission-form">
          {preview && (
            <div className="preview">
              <img src={preview} alt="Upload preview" />
              <div className={`loader${loading ? ' visible' : ''}`}>
                {/* <p>** barloader **</p> ?? What is this for? */}
              </div>
            </div>
          )}
          {!complete && (
            // If the submission hasn't been processed successfully
            <>
              <label className={file ? 'selected' : ''}>
                {file ? (
                  <span>Change Picture</span>
                ) : (
                  <div>
                    <img src={activeUpload} />
                    <span>Upload File</span>
                  </div>
                )}
                <input type="file" onChange={fileSelection} hidden />
              </label>
              <Button type="secondary" htmlType="submit">
                Submit Your Story
              </Button>
            </>
          )}
        </form>
      </div>

      <Checkbox
        id="submitFDSCCheckbox"
        name="submitFDSCCheckbox"
        label={
          <p className="small">
            Would you also like to submit to our Free Daily Story Contest?
          </p>
        }
        errors={errors}
        register={register}
        disabled={userInfo?.isValidated ? false : true}
        // rules={{
        //   validate: {
        //     isChecked: (value) => value,
        //   },
        // }}
      />
      {!userInfo?.isValidated && (
        <Button onClick={openParentValidationModal}>Verify Account</Button>
      )}
      {complete && (
        // Once the submission is done, show a button.
        <div className="success">Submission successful!</div>
      )}
    </div>
  );
};

export default SubmissionForm;
