import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Sections } from '../../../../api';
import { auth } from '../../../../state';
import { Input, Select } from '../../../common';

const NewSection = (): React.ReactElement => {
  const { errors, register, handleSubmit } = useForm();
  const [enumData, setEnumData] = useState<Sections.ISectionEnumData>();
  const user = useRecoilValue(auth.user);

  const onSubmit: SubmitHandler<Sections.INewSectionBody> = async (
    data,
  ): Promise<void> => {
    try {
      if (user) {
        console.log(data);
        Sections.createNewSection(data, user.id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Sections.getSectionEnumData()
      .then((res) => {
        setEnumData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Class name"
        name="name"
        register={register}
        id="class-name"
        errors={errors}
        placeholder="English 12"
        rules={{ required: 'Classname is required!' }}
      />
      {/* <option value="Grade">Items</option> */}
      <Select.Component
        id="new-section-gradeId"
        options={enumData?.grades}
        name="gradeId"
        register={register}
        errors={errors}
        placeholder="Select A Grade"
        // TODO: Rules
      />
      <Select.Component
        id="new-section-subjectId"
        options={enumData?.subjects}
        name="subjectId"
        register={register}
        errors={errors}
        placeholder="Select A Subject"
        // TODO: Rules
      />
      <input type="submit" value="Create Section" />
    </form>
  );
};

export default NewSection;
