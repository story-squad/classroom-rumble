import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../../api';
import noStudents from '../../../../../assets/img/no_students.svg';
import { useRumbleFilter } from '../../../../../hooks';
import { modals } from '../../../../../state';
import { Button, Table } from '../../../../common';
import SectionRumbleCard from './SectionRumbleCard';

const RenderSectionRumbleList = ({
  // currentRumbles,
  section,
}: IRenderSectionRumbleListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.inviteModalIsOpen);
  const openInviteModal = () => setInviteModalOpen(true);
  // console.log(currentRumbles);

  const [currentRum, pastRumbles] = useRumbleFilter(section.rumbles);

  return (
    <div className="rumble-list-wrapper">
      <div className="rumble-list-container">
        <div className="rumble-list">
          {currentRum.length ? (
            <>
              <h2>Current Rumbles</h2>
              <Table.Header>
                <Table.Col>Date</Table.Col>
                <Table.Col>Status </Table.Col>
                {/* <Table.Col>No. of Student submissions</Table.Col> */}
                <Table.Col>Rumble details</Table.Col>
              </Table.Header>
              <Table.Body>
                {currentRum.map((rumble) => (
                  <SectionRumbleCard
                    rumble={rumble}
                    section={section}
                    key={rumble.id}
                  />
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="no-rumble">
              <div className="message-text-container">
                <p>There are no rumbles in this class &nbsp;</p>
                <Button type="text" onClick={openInviteModal}>
                  Invite to Class
                </Button>
              </div>
              <img src={noStudents} alt="you have no students" />
            </div>
          )}
          {pastRumbles.length ? (
            <>
              <h2>Past Rumbles</h2>
              <Table.Header>
                <Table.Col>Date</Table.Col>
                <Table.Col>Day of the Week </Table.Col>
                {/* <Table.Col>No. of Student submissions</Table.Col> */}
                <Table.Col>Rumble details</Table.Col>
              </Table.Header>
              <Table.Body>
                {pastRumbles.map((rumble) => (
                  <SectionRumbleCard
                    rumble={rumble}
                    section={section}
                    key={rumble.id}
                  />
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="no-rumble">
              <div className="message-text-container">
                <p>There are no past rumbles in this class &nbsp;</p>
              </div>
              <img src={noStudents} alt="you have no students" />
            </div>
          )}
          {/* ) : (
            <div className="no-rumble">
              <div className="message-text-container">
                <p>There are no rumbles in this class &nbsp;</p>
                <Button type="text" onClick={openInviteModal}>
                  Invite to Class
                </Button>
              </div>
              <img src={noStudents} alt="you have no students" />
            </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

interface IRenderSectionRumbleListProps {
  section: Sections.ISectionWithRumbles;
  currentRumbles: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderSectionRumbleList;
