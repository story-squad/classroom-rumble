import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Sections } from '../../../../api';
import { auth, sections } from '../../../../state';
import CouldNotLoad from '../../../common/CouldNotLoad/CouldNotLoad';
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
          setTeacherList(res);
        })
        .catch((err) => {
          console.log({ err });
          setError('It appears you are not in a section.');
        });
    }
  }, []);

  return error ? (
    <CouldNotLoad error={error} />
  ) : teacherList ? (
    <RenderTeacherSectionList teacherSections={teacherList} />
  ) : (
    <p>LOADING</p>
  );
};

export default TeacherSectionListContainer;
