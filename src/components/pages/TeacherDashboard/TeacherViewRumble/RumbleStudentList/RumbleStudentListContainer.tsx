import React, { useEffect, useState } from 'react';
import { Rumbles, Sections, Students } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderStudentList from './RenderRumbleStudentList';

const RumbleStudentListContainer = ({
  section,
  rumble,
}: IRumbleStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<
    Students.IStudentWithSubmissions[]
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let callback: Promise<Students.IStudentWithSubmissions[]>;
    // If a rumble is set, get the students based on rumble
    if (rumble) callback = Students.getWithSubsByRumbleId(rumble.id);
    // Else just get them based on section
    else callback = Students.getWithSubsBySectionId(section.id);
    // Resolve whichever promise you've saved (in the same way)
    callback
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

interface IRumbleStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
  rumble?: Rumbles.IRumbleWithSectionInfo;
}

export default RumbleStudentListContainer;
