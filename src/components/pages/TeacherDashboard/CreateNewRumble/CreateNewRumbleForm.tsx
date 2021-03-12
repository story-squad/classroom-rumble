import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts, Rumbles } from '../../../../api';
import { IRumblePostBody } from '../../../../api/Rumbles';
import { auth, rumbles, sections } from '../../../../state';
import { CheckboxGroup, Input, Select } from '../../../common';

const CreateNewRumbleForm = ({
  prompt,
}: ICreateNewRumbleFormProps): React.ReactElement => {
  // Functional Hooks
  const { register, handleSubmit } = useForm();
  const { push } = useHistory();

  // Subscribe to state
  const sectionList = useRecoilValue(sections.list);
  const user = useRecoilValue(auth.user);
  const addRumbles = useSetRecoilState(rumbles.addRumbles);

  // Parse the user's section list into a usable option type
  const sectionOptions = useMemo<Select.IOption<number>[]>(
    () => sectionList?.map((s) => ({ value: s.id, label: s.name })) ?? [],
    [sectionList],
  );

  const onSubmit: SubmitHandler<
    IRumblePostBody & { sectionIds: string[] }
  > = async ({ sectionIds, ...data }) => {
    // Parse the ids that have been checked (sectionId[n] is TRUE)
    // return the `value` of the option item at that index
    const idList = sectionOptions
      .filter((op, i) => sectionIds[i])
      .map((op) => op.value);
    try {
      if (user) {
        const res = await Rumbles.create(
          {
            numMinutes: parseInt(`${data.numMinutes}`, 10),
            promptId: prompt.id,
          },
          user.id,
          idList,
        );
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
        <h3>Time to Submit (minutes)</h3>
        <Input
          id="newRumbleNumMinutes"
          name="numMinutes"
          register={register}
          type="number"
          rules={{
            min: 5 || 'Must be at least 5 minutes!',
          }}
        />
      </div>
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
