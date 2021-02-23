import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INewSectionBody } from '../../../../api/Section';
import { Input } from '../../../common';

const TestData = [
  // subjectId: string // We'll get these from the backend
  // gradeId: string // Getting these from the backend as well!
  { name: 'Science', subjectId: '4', gradeId: 'Item 4' },
  { name: 'Math', subjectId: '4', gradeId: 4 },
  { name: 'Art', subjectId: '4', gradeId: 4 },
  { name: 'Reading', subjectId: '4', gradeId: 4 },
  { name: 'Math>', subjectId: '2', gradeId: 2 },
  { name: 'Reading', subjectId: '6', gradeId: 2 },
  { name: 'Art', subjectId: '4', gradeId: 2 },
  { name: 'Art', subjectId: '3', gradeId: 2 },
];

const NewSection = (): React.ReactElement => {
  const { errors, register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<INewSectionBody> = async (
    data,
  ): Promise<void> => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

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
      <select name="Test" value="Test">
        {/* <option value="Grade">Items</option> */}
        {/* The value being put in the potions needs  */}
        {TestData.map((item, gradeId) => (
          <option key={gradeId}>{item.gradeId}</option>
        ))}
      </select>
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
