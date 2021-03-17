import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../api';
import { enumData, modals } from '../../../state';
import RenderSectionInfo from './RenderSectionInfo';

const SectionInfoContainer = ({
  section,
  isTeacher = false,
  studentName,
}: {
  section: Sections.ISectionWithRumbles;
  isTeacher?: boolean;
  studentName?: string;
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
    <RenderSectionInfo
      isTeacher={isTeacher}
      section={section}
      openInviteModal={openInviteModal}
      grade={gradeValue}
      subject={subjectValue}
      studentName={studentName}
    />
  );
};

export default SectionInfoContainer;
