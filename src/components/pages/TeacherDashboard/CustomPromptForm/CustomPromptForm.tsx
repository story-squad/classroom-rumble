import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { prompts } from '../../../../state';

const CustomPromptForm = (): React.ReactElement => {
  const { register, handleSubmit } = useForm();
  const setPrompts = useSetRecoilState(prompts.list);

  const onSubmit: SubmitHandler<Prompts.INewPrompt> = async (data) => {
    try {
      const res = await Prompts.addCustom(data.prompt);
      setPrompts((prev) => [...prev, res]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="custom-prompt-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-input">
          <label htmlFor="customPrompt">New Prompt:</label>
          <textarea
            ref={register && register({})}
            name="prompt"
            id="customPrompt"
            placeholder="Enter custom prompt..."
          />
        </div>
      </form>
    </div>
  );
};

export default CustomPromptForm;
