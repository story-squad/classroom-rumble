import { watch } from 'fs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { patterns } from '../../../../config';
import { Button, Input } from '../../../common';

const ParentValidationForm = (): React.ReactElement => {
  const { errors, register } = useForm({
    mode: 'onChange',
  });

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('something');
  };

  return (
    <form onSubmit={submitEmail}>
      <h2>
        You need permission from your parent to enter the Free Daily Story
        Contest. Please enter their email below
      </h2>
      <Input
        label="Parent Email"
        name="parent email"
        register={register}
        id="parent-email"
        errors={errors}
        placeholder="Enter Your Parent's Email"
        rules={{
          validate: {
            differentEmail: (value) => {
              return (
                value !== watch('email') ||
                'Parent email must be different from your email!'
              );
            },
          },
          pattern: {
            value: patterns.emailRegex,
            message: 'Please enter a valid email address.',
          },
        }}
      />
      {/* TODO: use button's onClick not onSubmit
      Requires Endpoint to post parent email to user's account and resend validation email. */}
      <Button>Submit</Button>
    </form>
  );
};

export default ParentValidationForm;
