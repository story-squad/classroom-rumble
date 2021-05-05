import React, { useEffect, useState } from 'react';
import { Rumbles, Sections, Students } from '../../../../../api';
import { useAsync } from '../../../../../hooks';
import { CouldNotLoad, Loader } from '../../../../common';
import RenderRumbleStudentList from './RenderRumbleStudentList';

const RumbleStudentListContainer = ({
  rumble,
  section,
}: IRumbleStudentListContainerProps): React.ReactElement => {
  const [studentList, setStudentList] = useState<
    Students.IStudentWithSubmissions[]
  >();

  const [getWithSubsByRumbleId, loading, , error] = useAsync({
    asyncFunction: Students.getWithSubsByRumbleId,
    setter: setStudentList,
  });
  useEffect(() => {
    getWithSubsByRumbleId(rumble.id);
  }, [section, rumble]);

  return studentList && section ? (
    <RenderRumbleStudentList studentList={studentList} section={section} />
  ) : error ? (
    <CouldNotLoad error={error.message} />
  ) : loading ? (
    <Loader message={'Loading students'} />
  ) : (
    <>Could not load students</>
  );
};

interface IRumbleStudentListContainerProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentListContainer;
