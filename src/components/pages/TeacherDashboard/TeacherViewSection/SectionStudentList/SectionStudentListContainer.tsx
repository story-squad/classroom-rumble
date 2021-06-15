import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { students } from '../../../../../state';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderSectionStudentList from './RenderSectionStudentList';

const SectionStudentListContainer = ({
  section,
  visible = true,
}: ISectionStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useRecoilState(students.list);

  const [getStudents, isLoading, , error] = useAsync({
    asyncFunction: Students.getWithSubsBySectionId,
    setter: setStudentList,
  });

  useEffect(() => {
    getStudents(section.id);
  }, [section]);

  if (!visible) return <></>;
  return studentList ? (
    <RenderSectionStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : isLoading ? (
    <Loader message={'Loading students'} />
  ) : (
    <CouldNotLoad error="Could not load students" />
  );
};

interface ISectionStudentListContainerProps {
  section: Sections.ISectionWithRumbles;
  visible?: boolean;
}

export default SectionStudentListContainer;
