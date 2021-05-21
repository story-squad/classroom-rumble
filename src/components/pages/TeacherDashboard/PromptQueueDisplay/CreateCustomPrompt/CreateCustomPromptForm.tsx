import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../../api';
import { prompts } from '../../../../../state';
import { Modal } from '../../../../common';

const CreateCustomPromptForm = ({
  closeModal,
}: Modal.ModalComponentProps): React.ReactElement => {
  const { register, handleSubmit, errors } = useForm();
  const setCustomPrompts = useSetRecoilState(prompts.customList);
  const { addToast } = useToasts();

  const onSubmit: SubmitHandler<Prompts.INewPrompt> = async (data) => {
    console.log(data);
    try {
      const res = (await Prompts.addCustom(
        data.prompt,
      )) as Prompts.IPromptInQueue; // We're handling edge cases in the display component
      setCustomPrompts((prev) => [...prev, res]);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (errors.prompt) addToast(errors.prompt.message, { appearance: 'error' });
  }, [errors]);

  return (
    <div className="custom-prompt-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-input">
          <label htmlFor="customPrompt">New Prompt:</label>
          <textarea
            autoFocus
            ref={
              register &&
              register({
                required: 'Prompt cannot be empty',
                minLength: {
                  value: 10,
                  message: 'Prompt must be at least 10 characters',
                },
              })
            }
            name="prompt"
            id="customPrompt"
            rows={5}
            placeholder="Enter custom prompt..."
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateCustomPromptForm;
