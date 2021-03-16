import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import { modals } from '../../../../state';
import { InviteToSection } from '../InviteToSection';
import { CreateNewSection } from './CreateNewSection';
import Section from './TeacherDashboardSectionCard';

const RenderTeacherDashboardSectionList = ({
  sections,
}: ITeacherDashboardSectionListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.invite.isOpen);
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  const openSectionModal = () => setNewSectionOpen(true);
  const openInviteModal = () => setInviteModalOpen(true);
  return (
    <>
      <CreateNewSection
        isVisible={newSectionOpen}
        setIsVisible={setNewSectionOpen}
      />
      <InviteToSection />
      <div className="teacher-dash-section-list-wrapper">
        <div className="teacher-dash-section-list-container">
          <h2>Classes</h2>
          <div className="button-row">
            <button onClick={openSectionModal}>Add Class</button>
            <button onClick={openInviteModal}>Invite to Class</button>
          </div>
          <div className="section-list">
            {sections?.map((sec) => (
              <Section {...sec} key={sec.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface ITeacherDashboardSectionListProps {
  sections: Sections.ISectionWithRumbles[];
  isTeacher?: boolean;
}

export default RenderTeacherDashboardSectionList;
