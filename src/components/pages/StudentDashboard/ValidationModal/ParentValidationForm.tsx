import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Auth } from '../../../../api';
import { patterns } from '../../../../config';
import { Button, Input, Modal } from '../../../common';

const ParentValidationForm = ({
  closeModal,
}: Modal.ModalComponentProps): React.ReactElement => {
  const { errors, setError, register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const resendEmail = async () => {
    try {
      await Auth.resendEmail();
      closeModal();
    } catch (err) {
      console.log({ err });
    }
  };

  const sendEmail: SubmitHandler<Auth.NewEmailFormState> = async (formData) => {
    try {
      const data = Auth.formatSendEmailBody(formData);
      await Auth.sendEmail(data);
      closeModal();
    } catch (err) {
      console.log('err', err.response.data.message);

      let message: string;
      if (err.response?.data) {
        message = err.response.data.message;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }
      if (message === 'Underage users must send to parent email') {
        setError('newEmail', { type: 'validate', message });
      } else if (message === 'Cannot send another email so soon') {
        setError('newEmail', { type: 'validate', message });
      } else {
        //ToDo ask about this line?
        setError('form', { type: 'manual', message });
      }
    }
  };

  return (
    <form className="parent-validation-form" onSubmit={handleSubmit(sendEmail)}>
      <div className="message-wrapper">
        <p>
          You need permission from your parent to enter the Free Daily Story
          Contest.
        </p>
        <p>Please enter their email below.</p>
      </div>
      <Input
        label="Age"
        name="ageStr"
        register={register}
        id="age"
        errors={errors}
        placeholder="Enter Your Age"
        rules={{
          required: 'Age is required!',
          validate: (value) => !!parseInt(value) || 'Age must be a number!',
        }}
      />
      <Input
        label="Parent/Guardian Email"
        name="newEmail"
        register={register}
        id="newEmail"
        errors={errors}
        placeholder="example@email.com"
        rules={{
          pattern: {
            value: patterns.emailRegex,
            message: 'Please enter a valid email address.',
          },
        }}
      />
      <div className="button-row">
        <Button htmlType="button" type="secondary" onClick={resendEmail}>
          Resend Email
        </Button>
        <Button>Send Email</Button>
      </div>
    </form>
  );
};

export default ParentValidationForm;
