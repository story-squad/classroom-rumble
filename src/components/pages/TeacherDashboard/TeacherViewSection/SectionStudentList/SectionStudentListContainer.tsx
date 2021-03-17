import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { students } from '../../../../../state';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderSectionStudentList from './RenderSectionStudentList';

const SectionStudentListContainer = ({
  section,
  visible = true,
}: ISectionStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useRecoilState(students.list);
  const [error, setError] = useState<string>();

  useEffect(() => {
    console.log('sectionId', section.id);
    Students.getWithSubsBySectionId(section.id)
      .then((res) => {
        setStudentList(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }, [section]);

  if (!visible) return <></>;
  return studentList ? (
    <RenderSectionStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <Loader message={'Loading students'} />
  );
};

interface ISectionStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
  visible?: boolean;
}

export default SectionStudentListContainer;
