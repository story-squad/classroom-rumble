import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Students } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { sections, students } from '../../../../../state';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderSectionStudentList from './RenderSectionStudentList';

const SectionStudentListContainer = ({
  visible = true,
}: ISectionStudentListContainerProps): React.ReactElement => {
  const sectionId = useRecoilValue(sections.selected);
  const [studentIds, updateStudentList] = useRecoilState(
    students.getIdsBySectionId(sectionId),
  );
  const addStudents = useSetRecoilState(students.add);

  const [getStudents, isLoading, , error] = useAsync({
    asyncFunction: Students.getWithSubsBySectionId,
    setter: (newStudents) => {
      // Add the students to be tracked by id
      addStudents(newStudents);
      // Transform from array of students to array of ids (objects -> numbers)
      const newStudentIds = newStudents.map((stu) => stu.id);
      // Add them to be tracked by their section ID as well
      updateStudentList(newStudentIds);
    },
  });

  useEffect(() => {
    if (sectionId) getStudents(sectionId);
  }, [sectionId]);

  if (!visible) return <></>;
  return studentIds && sectionId ? (
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
  visible?: boolean;
}

const SuspenseWrapperStudentList = (
  props: ISectionStudentListContainerProps,
): React.ReactElement => {
  return (
    <React.Suspense fallback={<Loader message="Loading students" />}>
      <SectionStudentListContainer {...props} />
    </React.Suspense>
  );
};

export default SuspenseWrapperStudentList;
