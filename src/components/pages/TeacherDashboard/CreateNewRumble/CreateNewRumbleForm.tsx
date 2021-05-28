import { DateTime } from 'luxon';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
    clearErrors,
    watch,
  } = useForm();
  const { push } = useHistory();
  const { addToast } = useToasts();

  // Subscribe to state
  const chosenDay: Date = watch().startDate;
  const sectionList = useRecoilValue(sections.list);
  const user = useRecoilValue(auth.user);
  const addRumbles = useSetRecoilState(rumbles.addRumbles);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [pastTwo, setPastTwo] = useState<boolean>(false);
  const [rumbleEnd, setRumbleEnd] = useState<string>('');
  //checking if the prompt Is custom or not and returns a boolean value
  const isCustom = useMemo<boolean>(() => !Prompts.isPromptInQueue(prompt), [
    prompt,
  ]);
  const [isCurrentDay, setCurrentDay] = useState<boolean>();
  // Parse the user's section list into a usable option type
  const sectionOptions = useMemo<FormTypes.IOption<number>[]>(
    () => sectionList?.map((s) => ({ value: s.id, label: s.name })) ?? [],
    [sectionList],
  );
  const checkDay = () => {
    if (chosenDay) {
      if (new Date().getDay() === chosenDay.getDay()) {
        setCurrentDay(true);
      } else {
        setCurrentDay(false);
      }
    } else return;
  };

  useEffect(() => {
    checkDay();
  }, [watch().startDate]);
  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };
  //Checks if the rumble end time is past the submit time (Currently hard coded 2pm)
  const checkEndTime = (time: any) => {
    if (new Date().setHours(2, 0, 0) >= time) {
      console.log(true);
      setPastTwo(true);
    } else return;
  };

  // useEffect(() => {
  //   checkEndTime(parseInt(rumbleEnd));
  // }, [rumbleEnd]);

  const onSubmit: SubmitHandler<{
    sectionIds: string[];
    rumbleTime: Date;
    startTime: Date; // cast as Date for type checks
    startDate: Date;
  }> = async ({ sectionIds, rumbleTime, startTime, startDate }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    const numMinutes = rumbleTime.getHours() * 60 + rumbleTime.getMinutes(); // how long the rumble is in only minutes
    console.log('NUM', numMinutes);
    const startTimeStamp = startTime.toISOString();
    const startDateStamp = startDate.toISOString();
    const startTimeObject = DateTime.fromISO(
      startDateStamp.slice(0, startDateStamp.indexOf('T')) +
        startTimeStamp.slice(startTimeStamp.indexOf('T')),
    );
    // calculates when the rumbles end
    const endTime = startTimeObject
      .plus({
        hour: rumbleTime.getHours(),
        minutes: rumbleTime.getMinutes(),
      })
      .toISO();
    setRumbleEnd(endTime);
    // console.log('Rumble Start', startTime);
    console.log('Rumble Time', rumbleTime);
    console.log('endTime', endTime);
    console.log({
      startTime: startTime.toLocaleString(),
      startTimeStamp,
      startDateStamp,
      now: new Date().toISOString(),
    });
    throw new Error();

    // try {
    //   if (user) {
    //     const res = await Rumbles.create(
    //       { numMinutes, promptId: prompt.id },
    //       user.id,
    //       idList,
    //     );
    //     addRumbles(res);
    //     addToast('Successfuly Created a Rumble!', { appearance: 'success' });
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
    //     message = 'Please select a class';
    //   }
    //   addToast(message, { appearance: 'error' });
    // }
  };

  const [executeSubmit, loading, ,] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
  });

  //   If connect is checked, start time is required and start time cannot exceed submission cutoff time minus timer length. (end time cannot be past the submission cutoff time)

  // If connect is not checked, start time is not required

  // Changing the timer value should change the cutoff time of the start time.

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
          name="rumbleTime"
          defaultValue={new Date(new Date().setHours(1, 0, 0, 0))}
          render={({ value, ...props }) => (
            <DatePicker
              selected={value}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              {...props}
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
                minDate={new Date()}
                {...props}
              />
            )}
          />
          {/* Add more logic? If it is not custom prompt check for endtime and day */}
          {isCurrentDay && !isCustom ? (
            <Controller
              control={control}
              defaultValue={null}
              name="startTime"
              render={({ value, ...props }) => (
                <DatePicker
                  placeholderText="Select time"
                  selected={value}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  filterTime={(date) => Date.now() < date.getTime()}
                  onChangeRaw={checkEndTime}
                  {...props}
                />
              )}
            />
          ) : !isChecked ? (
            <Controller
              control={control}
              defaultValue={null}
              name="startTime"
              render={({ value, ...props }) => (
                <DatePicker
                  placeholderText="Select time"
                  selected={value}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  onChangeRaw={checkEndTime}
                  {...props}
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              defaultValue={null}
              name="startTime"
              render={({ value, ...props }) => (
                <DatePicker
                  placeholderText="Select time"
                  selected={value}
                  showTimeSelect
                  showTimeSelectOnly
                  dateFormat="h:mm aa"
                  // excludeTimes={[new Date(new Date().setHours(2, 30, 0, 0))]}
                  onChangeRaw={checkEndTime}
                  {...props}
                />
              )}
            />
          )}
        </div>
      </div>
      {!isCustom && (
        <div className="section-wrapper">
          <label>
            <input
              checked={isChecked}
              type="checkbox"
              id="checkConnect"
              name="connectFDSC"
              onChange={toggleCheck}
            />
            Connect To Free Daily Story Contest (Optional) <span>?</span>
          </label>
        </div>
      )}
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
          Start Rumble
        </Button>
      </div>
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  prompt: Prompts.IPrompt | Prompts.IPromptInQueue;
}

export default CreateNewRumbleForm;
