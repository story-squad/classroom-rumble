import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../../../../../api';
import activeUpload from '../../../../../../../assets/img/active_upload.svg';
import { auth, modals, rumbles, submissions } from '../../../../../../../state';
import { upload } from '../../../../../../../utils';
import { Button, Checkbox } from '../../../../../../common';
import { CouldNotLoadModal } from '../../../../../../common/CouldNotLoad';
/**
 * Submission Form allows students to submit an image to the rumble they are currenly in.
 */

const SubmissionForm = (): React.ReactElement => {
  const { errors, register } = useForm({
    mode: 'onChange',
  });

  const userInfo = useRecoilValue(auth.user);
  // We will always know the rumble if we get this far bc the PromptBox is only rendered within a Rumble.
  const currentRumble = useRecoilValue(rumbles.current);
  // Ensuring the promptId is a string before it is uploaded
  const promptId = currentRumble?.promptId.toString();

  // Error handling toast notifications
  const { addToast } = useToasts();
  // Recoil State for user submissions
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [loading, setLoading] = useState(false);
  const setSubIdForRumble = useSetRecoilState(
    submissions.getIdByRumbleAndUser({
      rumbleId: currentRumble?.id,
      userId: userInfo?.id,
    }),
  );
  const addSubmissions = useSetRecoilState(submissions.add);
  const [visible, setVisible] = useState(false);

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
        reqBody.append('promptId', `${promptId}`);
        reqBody.append('rumbleId', `${currentRumble?.id}`);

        // ALL GOOD TO UPLOAD!
        // POST a submission here
        const newSubItem = await Submissions.submitStory(reqBody);
        addSubmissions(newSubItem);
        setSubIdForRumble(newSubItem.id);
      } catch (err) {
        if (err?.response?.data?.error) {
          let message: string;
          // Am not sure how to test this if we even can at the moment
          if (err.response.data.error === 'Transcription error') {
            message = 'Picture must be of written text';
          } else {
            message = err.response.data.error;
          }
          addToast(message, { appearance: 'error' });
        } else {
          setVisible(true);
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
          addToast('Upload must be an image!', { appearance: 'error' });
        } else {
          setFile(selection);
          setPreview(URL.createObjectURL(selection));
        }
      }
    }
  };

  return (
    <>
      <CouldNotLoadModal
        error={
          <>
            Something went wrong.
            <br />
            Please try uploading your file again
          </>
        }
        visible={visible}
        setVisible={setVisible}
      />

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
      </div>
    </>
  );
};

export default SubmissionForm;
