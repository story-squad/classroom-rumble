import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Sections } from '../../../../api';
import rocketBoy from '../../../../assets/img/rocket_boy.svg';
import talk from '../../../../assets/img/speech.svg';
import { modals } from '../../../../state';
import { Button } from '../../../common';
import { InviteToSection } from '../InviteToSection';
import { CreateNewSection } from './CreateNewSection';
import Section from './TeacherDashboardSectionCard';

const RenderTeacherDashboardSectionList = ({
  sections,
}: ITeacherDashboardSectionListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.inviteModalIsOpen);
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  const openSectionModal = () => setNewSectionOpen(true);
  const openInviteModal = () => setInviteModalOpen(true);

  return (
    <div className="teacher-dash-section-list-wrapper">
      <div className="teacher-dash-section-list-container">
        <h2>Classes</h2>
        <CreateNewSection
          isVisible={newSectionOpen}
          setIsVisible={setNewSectionOpen}
        />
        <InviteToSection />
        {sections.length <= 0 ? (
          <div className="no-sections">
            <div>
              <img
                className="speach"
                src={talk}
                alt="You don't have any classes yet. Let's get started!"
                onClick={openSectionModal}
              />
              <img
                className="rocket"
                src={rocketBoy}
                alt="You don't have any classes"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="button-row">
              <Button type="secondary" onClick={openSectionModal}>
                Add New Class
              </Button>
              <Button type="secondary" onClick={openInviteModal}>
                Invite Student
              </Button>
            </div>
            <div className="section-list">
              {sections?.map((sec) => (
                <Section {...sec} key={sec.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ITeacherDashboardSectionListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default RenderTeacherDashboardSectionList;
