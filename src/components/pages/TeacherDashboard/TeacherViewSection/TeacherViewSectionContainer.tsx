import React from 'react';
import { useRecoilValue } from 'recoil';
import { sections } from '../../../../state';
import { Loader } from '../../../common';
import RenderTeacherViewSection from './RenderTeacherViewSection';

const TeacherViewSectionContainer = (): React.ReactElement => {
  const sectionId = useRecoilValue(sections.selected);

  return sectionId ? (
    <RenderTeacherViewSection sectionId={sectionId} />
  ) : (
    <Loader message="Loading section" />
  );
};

export default TeacherViewSectionContainer;
