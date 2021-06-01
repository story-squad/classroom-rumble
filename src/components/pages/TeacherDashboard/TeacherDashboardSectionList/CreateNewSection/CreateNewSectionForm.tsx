import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../../../api';
import { auth, enumData, sections } from '../../../../../state';
import { Input, Modal, Select } from '../../../../common';

const CreateNewSectionForm = ({
  closeModal,
}: Modal.ModalComponentProps): React.ReactElement => {
  const { errors, register, handleSubmit } = useForm();
  const user = useRecoilValue(auth.user);
  const grades = useRecoilValue(enumData.grades);
  const subjects = useRecoilValue(enumData.subjects);
  const addSections = useSetRecoilState(sections.add);
  const { addToast } = useToasts();

  const onSubmit: SubmitHandler<Sections.INewSectionBody> = async (data) => {
    try {
      if (user) {
        const res = await Sections.createNewSection(data, user.id);
        addSections(res);
        addToast('Successfuly created a class!', { appearance: 'success' });
        closeModal();
      }
    } catch (err) {
      console.log(err);
      let message: string;
      if (err.response?.data) {
        message = err.response.data.message;
      } else {
        message = 'An unknown error occurred. Please try again.';
      }
      addToast(message, { appearance: 'error' });
    }
  };

  useEffect(() => {
    if (errors.name) addToast(errors.name.message, { appearance: 'error' });
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-content">
        <Input
          label="Name"
          name="name"
          register={register}
          id="class-name"
          // errors={errors}
          placeholder="English 12"
          rules={{ required: 'Classname is required!' }}
        />
        <Select.Component
          id="new-section-gradeId"
          options={grades}
          name="gradeId"
          register={register}
          errors={errors}
          placeholder="Select A Grade"
          // TODO: Rules
        />
        <Select.Component
          id="new-section-subjectId"
          options={subjects}
          name="subjectId"
          register={register}
          errors={errors}
          placeholder="Select A Subject"
          // TODO: Rules
        />
      </div>
      <input type="submit" value="Confirm" />
    </form>
  );
};

export default CreateNewSectionForm;
