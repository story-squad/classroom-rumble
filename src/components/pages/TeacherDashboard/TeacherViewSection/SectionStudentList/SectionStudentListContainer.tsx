import React, { useEffect, useState } from 'react';
import { Sections, Students } from '../../../../../api';
import { CouldNotLoad } from '../../../../common';
import RenderSectionStudentList from './RenderSectionStudentList';

const SectionStudentListContainer = ({
  section,
}: ISectionStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<
    Students.IStudentWithSubmissions[]
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    Students.getWithSubsBySectionId(section.id)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [section.id]);

  return studentList ? (
    <RenderSectionStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <p>Loading students...</p>
  );
};

interface ISectionStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
}

export default SectionStudentListContainer;
