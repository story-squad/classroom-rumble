import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const studentList = useRecoilValue(students.ids);
  const section = useRecoilValue(sections.getById(rumble.sectionId));
  const [getWithSubsByRumbleId, , , error] = useAsync({
    asyncFunction: Students.getWithSubsByRumbleId,
    setter: addStudent,
  });

  useEffect(() => {
    getWithSubsByRumbleId(rumble.id);
  }, [rumble]);

  return studentList && section ? (
    <RenderRumbleStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : (
    <Loader message={'Loading students'} />
  );
};

export default RumbleStudentListContainer;
