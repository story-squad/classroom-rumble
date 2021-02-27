import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Sections } from '../../../../api';
import { auth, sections } from '../../../../state';
import { CouldNotLoad } from '../../../common';
import RenderTeacherSectionList from './RenderTeacherSectionList';

const TeacherSectionListContainer = (): React.ReactElement => {
  // TODO I beleive I need recoil state here to monitor the users section
  const [teacherList, setTeacherList] = useRecoilState(sections.list);
  const user = useRecoilValue(auth.user);

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (user) {
      Sections.getTeacherSections(user?.id)
        .then((res) => {
          console.log({ res });
          setTeacherList(res);
        })
        .catch((err) => {
          console.log({ err });
          setError(
            'It appears you have not created any sections yet. Please create a section.',
          );
        });
    }
  }, [user]);

  return teacherList ? (
    <RenderTeacherSectionList teacherSections={teacherList} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <>
      <p>Loading Section List...</p>
      <p>**Loader will live here**</p>
    </>
  );
};

export default TeacherSectionListContainer;
