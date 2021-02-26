import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Sections } from '../../../../api';
import { auth, sections } from '../../../../state';
import CouldNotLoad from '../../../common/CouldNotLoad/CouldNotLoad';
import RenderStudentSectionList from './RenderStudentSectionList';

const StudentSectionListContainer = (): React.ReactElement => {
  // TODO I beleive I need recoil state here to monitor the users section
  const [sectionList, setSectionList] = useRecoilState(sections.list);
  const user = useRecoilValue(auth.user);

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (user) {
      Sections.getStudentSections(user?.id)
        .then((res) => {
          setSectionList(res);
        })
        .catch((err) => {
          console.log({ err });
          setError(
            'It appears you are not in a section yet. You can be added to a section by your teacher.',
          );
        });
    }
  }, []);

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
