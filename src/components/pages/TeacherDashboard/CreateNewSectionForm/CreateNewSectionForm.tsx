import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Section } from '../../../../api';
import { IData, INewSectionBody } from '../../../../api/CreateSection';
import { Input } from '../../../common';

const NewSection = (): React.ReactElement => {
  const { errors, register, handleSubmit } = useForm();
  const [options, setOptions] = useState<IData[]>();

  const onSubmit: SubmitHandler<INewSectionBody> = async (): // data,
  Promise<void> => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Section.getSectionData()
      .then((res) => {
        setOptions(res);
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
        placeholder="Enter class name"
        rules={{ required: 'Classname is required!' }}
      />
      {/* <option value="Grade">Items</option> */}
      {/* The value being put in the potions needs  */}
      {options?.map(({ subjects, grades }, i) => (
        <>
          <label>
            Grade:
            <select>
              {grades.map(({ gradeId, value }) => (
                <option key={gradeId}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Subject:
            <select key={i} name="Test" value="Test">
              {subjects.map(({ subjectId, value }) => (
                <option key={subjectId}>{value}</option>
              ))}
            </select>
          </label>
        </>
      ))}
      ,
    </form>
  );
};

export default NewSection;

// The subject and gradeId are a drop down menu

// {
// name: string; // The name of the class!
// subjectId: string // We'll get these from the backend
// gradeId: string // Getting these from the backend as well!
// }
