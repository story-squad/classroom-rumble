import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { current, modals, sections } from '../../../../state';
import { Modal } from '../../../common';
import InviteCode from './InviteCode';
import SectionPicker from './SectionPicker';

const InviteToSection = ({
  disableSectionPicker = false,
}: IInviteToSectionProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useRecoilState(modals.inviteModalIsOpen);
  const [currentSection, setCurrentSection] = useRecoilState(current.section);
  const clearSection = useResetRecoilState(current.section);
  const sectionList = useRecoilValue(sections.list);

  return (
    <Modal.Component
      className="invite-to-section"
      component={() =>
        currentSection ? (
          <InviteCode
            disableSectionPicker={disableSectionPicker}
            section={currentSection}
            goBack={clearSection}
          />
        ) : (
          <SectionPicker
            sectionList={sectionList}
            setCurrentSection={setCurrentSection}
          />
        )
      }
      visible={isOpen}
      setVisible={setIsOpen}
      centered
      title={currentSection ? 'Join Link' : 'Select a Class'}
    />
  );
};

interface IInviteToSectionProps {
  disableSectionPicker?: boolean;
}

export default InviteToSection;
