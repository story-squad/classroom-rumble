// import { DateTime } from 'luxon';
import moment, { Moment } from 'moment';
import 'rc-time-picker/assets/index.css';
import React, { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
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
  // Subscribe to state
  const allSections = useRecoilValue(sections.getAll);
  const user = useRecoilValue(auth.user);
  const addRumbles = useSetRecoilState(rumbles.add);

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

  // Parse the user's section list into a usable option type
  const sectionOptions = useMemo<FormTypes.IOption<number>[]>(
    () =>
      allSections
        ?.filter((s) => !!s)
        .map((s) => ({
          value: s.id,
          label: s.name,
        })) ?? [],
    [allSections],
  );

  // Checkbox handlers for "Connect to FDSC button"
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  // Checking if the prompt Is custom or not and returns a boolean value
  const isCustom = useMemo<boolean>(() => !Prompts.isPromptInQueue(prompt), [
    prompt,
  ]);
  const goBack = () => push('/dashboard/teacher');

  const onSubmit: SubmitHandler<{
    sectionIds: string[];
    rumbleTime: Date;
    startTime: Date; // cast as Date for type checks
  }> = async ({ sectionIds, rumbleTime, startTime }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    const numMinutes = rumbleTime.getHours() * 60 + rumbleTime.getMinutes(); // how long the rumble is in only minutes
    console.log(startTime);
    try {
      if (user) {
        const res = await Rumbles.create({
          rumble: { numMinutes, promptId: prompt.id, start_time: startTime },
          teacherId: user.id,
          sectionIds: idList,
        });
        addRumbles(res);
        // const res = await Rumbles.create(
        //   { numMinutes, promptId: prompt.id },
        //   user.id,
        //   idList,
        // );
        // console.log('new rumble success', res);

        // // TODO - add end time and phase to rumbles
        // const parsedNewRumbles: Rumbles.IRumbleWithSectionInfo[] = res.map(
        //   (r) => ({
        //     ...r,
        //     phase: 'INACTIVE',
        //   }),
        // );
        // addRumbles(parsedNewRumbles);
        addToast('Successfuly Created a Rumble!', { appearance: 'success' });
        clearErrors();
        goBack();
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

  const [executeSubmit, loading] = useAsync({
    asyncFunction: handleSubmit(onSubmit),
  });

  //   If connect is checked, start time is required and start time cannot exceed submission cutoff time minus timer length.
  // (end time cannot be past the submission cutoff time)

  // If connect is not checked, start time is not required

  // Changing the timer value should change the cutoff time of the start time.

  const connectedStartMin = moment.max(
    moment((prompt as Prompts.IPromptInQueue).starts_at)
      .set('hour', schedule.submit.start.hour())
      .set('minute', schedule.submit.start.minutes()),
    moment(),
  );
  const connectedEndMax = moment((prompt as Prompts.IPromptInQueue).starts_at)
    .add(1, 'd')
    .set('hour', schedule.submit.end.hour())
    .set('minute', schedule.submit.end.minutes())
    .subtract(watch('rumbleTime')?.getHours(), 'h')
    .subtract(watch('rumbleTime')?.getMinutes(), 'm');

  const filterStartTimes = (date: Date): boolean => {
    // If not connected to FDSC, show all times
    if (!isChecked || isCustom) return date > new Date();
    // Else, check if startDate is first or second day
    return (
      date >= connectedStartMin.toDate() && date <= connectedEndMax.toDate()
    );
  };

  /**
   * CURRENTLY THIS BREAKS UNDER CERTAIN CONDITIONS!
   *
   * It's a very small break that only happens occasionally. To recreate:
   * 1. Have an active prompt that ends today in the queue
   * 2. Attempt to create a rumble for that prompt
   *
   * ---
   * 3. Click on schedule time and select yesterday
   * 4. You can no longer click on today
   * ===
   *
   * OR
   *
   * ---
   * 3. Nothing is selectable
   * ---
   */
  const filterStartDates = (date: Date): boolean => {
    const include = Prompts.isPromptInQueue(prompt)
      ? moment(prompt.starts_at).hours(0)
      : moment();
    // this is a hack
    const showIfInclude =
      include.date() === date.getDate() && include.month() === date.getMonth();

    if (isCustom || !isChecked) {
      return date >= moment().toDate() || showIfInclude;
    }

    // Else
    return (
      (date >= connectedStartMin.toDate() &&
        date <= connectedEndMax.toDate()) ||
      showIfInclude
    );
  };

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
            defaultValue={isChecked ? connectedStartMin.toDate() : undefined}
            name="startTime"
            render={({ value, ...props }) => (
              <DatePicker
                placeholderText="Select start time"
                selected={value}
                showTimeSelect
                dateFormat="MM/dd/yyyy h:mm aa"
                filterTime={filterStartTimes}
                filterDate={filterStartDates}
                {...props}
              />
            )}
          />
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
          Create A Rumble
        </Button>
      </div>
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  prompt: Prompts.IPrompt | Prompts.IPromptInQueue;
}

export default CreateNewRumbleForm;

// Schedule
/**
 * To convert a time to UTC, add 8 hours to PST or 5 hours to EST.
 * During daylight savings time, it's 7 and 4, respectively.
 *
 * To add tracking for another time-based event, MAKE SURE you add it to the
 * `eventType` type object _as well as_ the schedule object
 *
 * For SOME REASON when crossing over midnight the times get all wonky, so BOTH
 * times need to subtract 1 hour
 */
export const utcToLocal = (hour: number, minute: number): Moment => {
  return moment
    .utc()
    .hour(hour)
    .minute(minute)
    .seconds(0)
    .milliseconds(0)
    .local()
    .subtract(moment().isDST() ? 1 : 0, 'h');
};
export const schedule = {
  submit: {
    start: utcToLocal(1, 0), // should be 1, 30
    end: utcToLocal(22, 0), // should be 22, 0
  },
  offTime: {
    start: utcToLocal(22, 0),
    end: utcToLocal(22, 30),
  },
  vote: {
    start: utcToLocal(22, 30), // should be 22, 30
    end: utcToLocal(1, 0), // should be (1, 30)
  },
  stream: {
    start: utcToLocal(1, 0), // should be 1, 0
    end: utcToLocal(1, 30), // should be 1, 30
  },
  announce: {
    start: utcToLocal(1, 0), // should be 1 30
    end: utcToLocal(22, 0), // should be 22, 0
  },
};

// console.log({ schedule });
