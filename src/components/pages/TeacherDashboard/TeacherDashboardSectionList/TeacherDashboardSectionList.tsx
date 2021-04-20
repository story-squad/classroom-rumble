import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import rocketBoy from '../../../../assets/img/rocket_boy.svg';
import { modals } from '../../../../state';
import { list } from '../../../../state/sectionState';
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
  const sectionList = useRecoilValue(list);

  return (
    <>
      <div className="teacher-dash-section-list-wrapper">
        <div className="teacher-dash-section-list-container">
          <h2>Classes</h2>
        </div>
      </div>
      <CreateNewSection
        isVisible={newSectionOpen}
        setIsVisible={setNewSectionOpen}
      />
      <InviteToSection />
      {sectionList.length <= 0 ? (
        <div>
          <p>You don&apos;t have any classes yet. Let&apos;s get started!</p>
          <button onClick={openSectionModal}>Add Class</button>
          <img src={rocketBoy} alt="You don't have any classes" />
        </div>
      ) : (
        <>
          <div className="button-row">
            <button onClick={openSectionModal}>Add Class</button>
            <button onClick={openInviteModal}>Invite to Class</button>
          </div>
          <div className="section-list">
            {sections?.map((sec) => (
              <Section {...sec} key={sec.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

interface ITeacherDashboardSectionListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default RenderTeacherDashboardSectionList;
