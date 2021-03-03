import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Prompts, Rumbles } from '../../../../api';
import { IRumblePostBody } from '../../../../api/Rumbles';
import { auth, prompts, rumbles, sections } from '../../../../state';
import { Input, Select } from '../../../common';

const CreateNewRumbleForm = ({
  defaultSelected,
}: ICreateNewRumbleFormProps): React.ReactElement => {
  const { register, handleSubmit } = useForm();

  const [promptList, setPromptList] = useRecoilState(prompts.list);
  const [promptOffset, setPromptOffset] = useRecoilState(prompts.promptOffset);

  const promptQueue = useRecoilValue(prompts.queue);
  const customPrompts = useRecoilValue(prompts.customList);
  const sectionList = useRecoilValue(sections.list);
  const user = useRecoilValue(auth.user);

  const setRumbleList = useSetRecoilState(rumbles.addRumbles);

  const promptOptions = useMemo<Select.IOption[]>(() => {
    const op: Select.IOption[] = [];
    promptList.forEach((p) => op.push({ value: p.id, label: p.prompt }));
    // Add custom unique prompts to the option list!
    customPrompts.forEach((p) => {
      if (!op.some((opItem) => opItem.value === p.id)) {
        op.push({ value: p.id, label: p.prompt });
      }
    });
    // Restrict duplicates from showing in the select!
    promptQueue?.forEach((p) => {
      if (!op.some((opItem) => opItem.value === p.id)) {
        op.push({ value: p.id, label: p.prompt });
      }
    });
    return op;
  }, [promptList, promptQueue, customPrompts]);
  const sectionOptions = useMemo<Select.IOption[]>(
    () => sectionList?.map((s) => ({ value: s.id, label: s.name })) ?? [],
    [sectionList],
  );

  const onSubmit: SubmitHandler<
    IRumblePostBody & { sectionIds: string[] }
  > = async ({ sectionIds, ...data }) => {
    try {
      if (user) {
        const res = await Rumbles.create(
          {
            numMinutes: parseInt(`${data.numMinutes}`, 10),
            promptId: parseInt(`${data.promptId}`, 10),
          },
          user.id,
          sectionIds.map((x) => parseInt(`${x}`, 10)),
        );
        setRumbleList(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadMorePrompts = async () => {
    try {
      const promptResponse = await Prompts.getPrompts(promptOffset);
      setPromptList((prev) => [...prev, ...promptResponse]);
      setPromptOffset((prev) => prev + 5);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select.Component
        id="promptIdNewRumble"
        name="promptId"
        register={register}
        options={promptOptions}
        defaultValue={defaultSelected?.id}
      />
      <button onClick={loadMorePrompts} type="button">
        Load More Prompts
      </button>

      <Input
        id="newRumbleNumMinutes"
        name="numMinutes"
        label="Submission Time (minutes)"
        register={register}
        type="number"
        rules={{
          min: 5 || 'Must be at least 5 minutes!',
        }}
      />

      <Select.Component
        id="newRumbleSectionIds"
        name="sectionIds"
        register={register}
        multiple
        options={sectionOptions}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

interface ICreateNewRumbleFormProps {
  defaultSelected?: Prompts.IPrompt;
}

export default CreateNewRumbleForm;
