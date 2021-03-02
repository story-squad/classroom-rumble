import React, { useEffect, useState } from 'react';
import { Auth, Sections } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderStudentList from './RenderStudentList';

const StudentListContainer = ({
  sectionId,
}: IStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<Auth.IUser[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    Sections.getStudentsBySectionId(sectionId)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [sectionId]);

  return studentList ? (
    <RenderStudentList studentList={studentList} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading students...</p>
  );
};

interface IStudentListContainerProps {
  sectionId: number;
}

export default StudentListContainer;
