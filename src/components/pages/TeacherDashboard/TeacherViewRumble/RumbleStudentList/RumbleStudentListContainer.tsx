import React, { useEffect, useState } from 'react';
import { Rumbles, Sections, Students } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderRumbleStudentList from './RenderRumbleStudentList';

const RumbleStudentListContainer = ({
  section,
  rumble,
}: IRumbleStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<
    Students.IStudentWithSubmissions[]
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    setStudentList(undefined);
    Students.getWithSubsByRumbleId(rumble.id)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
    return () => setStudentList(undefined);
  }, [section.id]);

  return studentList ? (
    <RenderRumbleStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading students...</p>
  );
};

interface IRumbleStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
  rumble: Rumbles.IRumbleWithSectionInfo;
}

export default RumbleStudentListContainer;
