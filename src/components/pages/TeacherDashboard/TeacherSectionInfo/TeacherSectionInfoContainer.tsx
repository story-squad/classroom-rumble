import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import { enumData, modals } from '../../../../state';
import RenderTeacherSectionInfo from './RenderTeacherSectionInfo';

const TeacherSectionInfoContainer = ({
  section,
}: {
  section: Sections.ISectionWithRumbles;
}): React.ReactElement => {
  const gradeEnum = useRecoilValue(enumData.grades);
  const gradeValue = useMemo(() => {
    const x = gradeEnum?.filter((x) => x.value === section?.gradeId)[0];
    return x ? x.label : '';
  }, [gradeEnum, section]);

  const subjectEnum = useRecoilValue(enumData.subjects);
  const subjectValue = useMemo(() => {
    const x = subjectEnum?.filter((x) => x.value === section?.subjectId)[0];
    return x ? x.label : '';
  }, [subjectEnum, section]);

  const setInviteOpen = useSetRecoilState(modals.invite.isOpen);
  const openInviteModal = () => {
    setInviteOpen(true);
  };

  return (
    <RenderTeacherSectionInfo
      section={section}
      openInviteModal={openInviteModal}
      grade={gradeValue}
      subject={subjectValue}
    />
  );
};

export default TeacherSectionInfoContainer;
