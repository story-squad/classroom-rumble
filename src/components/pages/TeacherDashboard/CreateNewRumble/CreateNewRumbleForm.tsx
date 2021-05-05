import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts, Rumbles } from '../../../../api';
import { auth, rumbles, sections } from '../../../../state';
import { FormTypes } from '../../../../types';
import { CheckboxGroup } from '../../../common';

const CreateNewRumbleForm = ({
  prompt,
}: ICreateNewRumbleFormProps): React.ReactElement => {
  // Functional Hooks
  const { register, handleSubmit, control } = useForm();
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
    startTime: moment.Moment; // cast as Date for type checks
  }> = async ({ sectionIds, momentTime, startTime }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    const numMinutes = momentTime.minutes() + 60 * momentTime.hour();
    const startingTimestamp = startTime.toISOString() as unknown; // cast this as a Date if you use it later

    try {
      if (user) {
        const res = await Rumbles.create({
          rumble: {
            numMinutes,
            promptId: prompt.id,
            start_time: startingTimestamp as Date, // casting as Date
          },
          teacherId: user.id,
          sectionIds: idList,
        });
        addRumbles(res);
        push('/dashboard/teacher');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => push('/dashboard/teacher');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="section-wrapper">
        <h3>Select Class(es)</h3>
        <CheckboxGroup
          id="newRumbleSectionIds"
          name="sectionIds"
          register={register}
          options={sectionOptions}
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
      {/* <div className="section-wrapper">
        <h3>Set a Start Time</h3>
        <Controller
          control={control}
          name="startTime"
          defaultValue={moment().hour(1).minute(0)}
          render={(props) => <DatePicker />}
        />
      </div> */}
      <div className="button-row">
        <button type="button" onClick={goBack}>
          Cancel
        </button>
        <input type="submit" value="Create" />
      </div>
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  prompt: Prompts.IPrompt;
}

export default CreateNewRumbleForm;
