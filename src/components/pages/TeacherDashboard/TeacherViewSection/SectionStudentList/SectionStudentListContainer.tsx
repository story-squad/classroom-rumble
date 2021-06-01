import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Students } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { students } from '../../../../../state';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderSectionStudentList from './RenderSectionStudentList';

const SectionStudentListContainer = ({
  sectionId,
  visible = true,
}: ISectionStudentListContainerProps): React.ReactElement => {
  const studentIds = useRecoilValue(students.ids);
  const addStudents = useSetRecoilState(students.add);

  const [getStudents, isLoading, , error] = useAsync({
    asyncFunction: Students.getWithSubsBySectionId,
    setter: addStudents,
  });

  useEffect(() => {
    getStudents(sectionId);
  }, [sectionId]);

  if (!visible) return <></>;
  return studentIds ? (
    <RenderSectionStudentList studentIds={studentIds} sectionId={sectionId} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : isLoading ? (
    <Loader message={'Loading students'} />
  ) : (
    <CouldNotLoad error="Could not load students" />
  );
};

interface ISectionStudentListContainerProps {
  sectionId: number;
  visible?: boolean;
}

export default SectionStudentListContainer;
