import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts } from '../../../../api';
import { useAsync } from '../../../../hooks';
import { auth, rumbles, sections } from '../../../../state';
import { FormTypes } from '../../../../types';
import { Button, CheckboxGroup } from '../../../common';

const CreateNewRumbleForm = ({
  prompt,
}: ICreateNewRumbleFormProps): React.ReactElement => {
  // Functional Hooks
  const {
    errors,
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
  } = useForm();
  const { push } = useHistory();

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
    startTime: Date; // cast as Date for type checks
    startDate: Date;
  }> = async ({ sectionIds, momentTime, startTime, startDate }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    const numMinutes = momentTime.minutes() + 60 * momentTime.hour();
    const startTimeStamp = startTime.toISOString();
    const startDateStamp = startDate.toISOString();
    startTime = new Date(
      startDateStamp.slice(0, startDateStamp.indexOf('T')) +
        startTimeStamp.slice(startTimeStamp.indexOf('T')),
    );
    if (startTime < new Date()) {
      console.log('hey');
      throw new Error('Rumble can not start in the past');
    }
    console.log({
      startTime: startTime.toLocaleString(),
      startTimeStamp,
      startDateStamp,
      now: new Date().toISOString(),
    });
    throw new Error();

    // try {
    //   if (user) {
    //     const res = await Rumbles.create({
    //       rumble: {
    //         numMinutes,
    //         promptId: prompt.id,
    //         start_time: startTime, // casting as Date
    //       },
    //       teacherId: user.id,
    //       sectionIds: idList,
    //     });
    //     addRumbles(res);
    //     clearErrors();
    //     push('/dashboard/teacher');
    //   }
    // } catch (err) {
    //   console.log({ err });
    //   let message: string;
    //   if (err.response?.data) {
    //     message = err.response.data.message;
    //   } else {
    //     message = 'An unknown error occurred. Please try again.';
    //   }

    //   if (message === 'Invalid or missing fields in body: sectionIds') {
    //     setError('sectionIds', {
    //       type: 'required',
    //       message: 'Please select a class',
    //     });
    //   } else {
    //     throw new Error(message);
    //   }
    // }
  };

  const [executeSubmit, loading, , error] = useAsync({
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
      <div className="section-wrapper">
        <h3>Schedule</h3>
        <div>
          <Controller
            control={control}
            defaultValue={new Date()}
            name="startDate"
            render={({ value, ...props }) => (
              <DatePicker
                placeholderText="Select date"
                selected={value}
                {...props}
              />
            )}
          />
          <Controller
            control={control}
            name="startTime"
            render={({ value, ...props }) => (
              <DatePicker
                placeholderText="Select time"
                selected={value}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                {...props}
              />
            )}
          />
        </div>
      </div>

      {error && <div className="errors">{error.message}</div>}
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
          Create
        </Button>
      </div>
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  prompt: Prompts.IPrompt;
}

export default CreateNewRumbleForm;
