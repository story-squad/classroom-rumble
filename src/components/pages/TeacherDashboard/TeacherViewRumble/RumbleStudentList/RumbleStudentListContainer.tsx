import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Rumbles, Students } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { sections, students } from '../../../../../state';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderRumbleStudentList from './RenderRumbleStudentList';

const RumbleStudentListContainer = ({
  rumble,
}: {
  rumble: Rumbles.IRumbleWithSectionInfo;
}): React.ReactElement => {
  const addStudent = useSetRecoilState(students.add);
  const section = useRecoilValue(sections.getById(rumble.sectionId));
  const [studentList, updateStudentList] = useRecoilState(
    students.getIdsBySectionId(rumble.sectionId),
  );

  const [getWithSubsByRumbleId, , , error] = useAsync({
    asyncFunction: Students.getWithSubsByRumbleId,
    setter: (newStudents) => {
      // Add the students to be tracked by id
      addStudent(newStudents);

      // Transform from array of students to array of ids (objects -> numbers)
      const newStudentIds = newStudents.map((stu) => stu.id);
      console.log({ newStudentIds, newStudents, sectionId: section?.id });
      // Add them to be tracked by their section ID as well
      updateStudentList(newStudentIds);
    },
  });

  useEffect(() => {
    getWithSubsByRumbleId(rumble.id);
  }, [rumble]);

  useEffect(() => console.log({ section, rumble }));

  return studentList && section ? (
    <RenderRumbleStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading students'} />
  );
};

export default RumbleStudentListContainer;
