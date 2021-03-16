import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Sections } from '../../../../api';
import { auth, sections } from '../../../../state';
import { CouldNotLoad } from '../../../common';
import RenderStudentSectionList from './RenderStudentSectionList';

const StudentSectionListContainer = (): React.ReactElement => {
  const [sectionList, setSectionList] = useRecoilState(sections.list);
  const user = useRecoilValue(auth.user);

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (user && !sectionList) {
      Sections.getStudentSections(user.id)
        .then((res) => {
          console.log(res);
          setSectionList(res);
        })
        .catch((err) => {
          console.log({ err });
          setError(
            'It appears you are not in a section yet. You can be added to a section by your teacher.',
          );
        });
    }
  }, [user]);

  return sectionList ? (
    <RenderStudentSectionList studentSections={sectionList} />
  ) : error ? (
    <CouldNotLoad error={error} />
  ) : (
    <>
      <p>Loading Section List...</p>
      <p>**Loader will live here**</p>
    </>
  );
};

export default StudentSectionListContainer;
