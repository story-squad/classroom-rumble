import React from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { modals, rumbles, sections } from '../../../../state';
import { Modal } from '../../../common';
import InviteCode from './InviteCode';
import SectionPicker from './SectionPicker';

const InviteToSection = ({
  disableSectionPicker = false,
}: IInviteToSectionProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useRecoilState(modals.inviteModalIsOpen);
  const currentSection = useRecoilValue(sections.current);
  const clearSection = useResetRecoilState(sections.selected);
  const clearRumble = useResetRecoilState(rumbles.selected);

  const clearSelection = () => {
    clearSection();
    clearRumble();
  };

  return (
    <Modal.Component
      className="invite-to-section"
      component={() =>
        currentSection ? (
          <InviteCode
            disableSectionPicker={disableSectionPicker}
            section={currentSection}
            goBack={clearSelection}
          />
        ) : (
          <SectionPicker />
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
