import React, { useEffect, useState } from 'react';
import { Rumbles, Sections, Students } from '../../../../../api';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderRumbleStudentList from './RenderRumbleStudentList';

const RumbleStudentListContainer = ({
  rumble,
  section,
}: IRumbleStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<
    Students.IStudentWithSubmissions[]
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    console.log('rumbleId', rumble.id);
    setStudentList(undefined);
    Students.getWithSubsByRumbleId(rumble.id)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [section, rumble]);

  return studentList && section ? (
    <RenderRumbleStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message="Loading students" />
  );
};

interface IRumbleStudentListContainerProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentListContainer;
