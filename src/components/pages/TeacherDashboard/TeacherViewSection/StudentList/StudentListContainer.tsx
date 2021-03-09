import React, { useEffect, useState } from 'react';
import { Auth, Sections } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderStudentList from './RenderStudentList';

const StudentListContainer = ({
  section,
}: IStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<Auth.IUser[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    Sections.getStudentsBySectionId(section.id)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [section.id]);

  return studentList ? (
    <RenderStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading students...</p>
  );
};

interface IStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
}

export default StudentListContainer;
