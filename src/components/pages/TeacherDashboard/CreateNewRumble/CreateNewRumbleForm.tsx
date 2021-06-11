import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts, Rumbles } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { auth, rumbles, sections } from '../../../../state';
import { FormTypes } from '../../../../types';
import { Button, CheckboxGroup } from '../../../common';

const CreateNewRumbleForm = ({
  prompt,
}: ICreateNewRumbleFormProps): React.ReactElement => {
  // Functional Hooks
  const { errors, register, handleSubmit, control, clearErrors } = useForm();
  const { push } = useHistory();

  const { addToast } = useToasts();

  // Subscribe to state
  const sectionList = useRecoilValue(sections.list);
  const user = useRecoilValue(auth.user);
  const addRumbles = useSetRecoilState(rumbles.addRumbles);

  // Parse the user's section list into a usable option type
  const sectionOptions = useMemo<FormTypes.IOption<number>[]>(
    () => sectionList?.map((s) => ({ value: s.id, label: s.name })) ?? [],
    [sectionList],
  );

  const onSubmit: SubmitHandler<{
    sectionIds: string[];
    momentTime: moment.Moment;
  }> = async ({ sectionIds, momentTime }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    const numMinutes = momentTime.minutes() + 60 * momentTime.hour();
    try {
      if (user) {
        const res = await Rumbles.create(
          { numMinutes, promptId: prompt.id },
          user.id,
          idList,
        );
        addRumbles(res);
        addToast('Successfuly Created a Rumble!', { appearance: 'success' });
        clearErrors();
        push('/dashboard/teacher');
      }
    } catch (err) {
      console.log({ err });
      let message: string;
      if (err.response?.data) {
        message = err.response.data.message;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }
      if (message === 'Invalid or missing fields in body: sectionIds') {
        message = 'Please select a class';
      }
      addToast(message, { appearance: 'error' });
    }
  };

  const [executeSubmit, loading, ,] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
  });

  const goBack = () => push('/dashboard/teacher');

  return (
    <form onSubmit={executeSubmit}>
      <div className="section-wrapper">
        <h3>Select Class(es)</h3>
        <CheckboxGroup
          id="newRumbleSectionIds"
          name="sectionIds"
          register={register}
          options={sectionOptions}
          errors={errors}
          // rules={{ required: 'Please select a class.' }}
        />
      </div>
      <div className="section-wrapper">
        <h3>Set a Timer</h3>
        <Controller
          control={control}
          name="momentTime"
          defaultValue={moment().hour(1).minute(0)}
          render={(props) => (
            <TimePicker
              {...props}
              minuteStep={15}
              showSecond={false}
              defaultOpenValue={moment().hour(1).minute(0)}
            />
          )}
        />
      </div>
      <div className="button-row">
        <Button htmlType="button" type="secondary" onClick={goBack}>
          Cancel
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          onClick={() => clearErrors()}
          loading={loading}
        >
          Create Rumble
        </Button>
      </div>
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  prompt: Prompts.IPrompt;
}

export default CreateNewRumbleForm;
