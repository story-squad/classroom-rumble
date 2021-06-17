import React from 'react';
import noStudents from '../../../../../assets/img/no_students.svg';
import { Table } from '../../../../common';
import SectionRumbleCard from './SectionRumbleCard';

const RenderSectionRumbleList = ({
  currentRumbleIds,
  pastRumbleIds,
}: IRenderSectionRumbleListProps): React.ReactElement => {
  return (
    <div className="rumble-list-wrapper">
      <div className="rumble-list-container">
        <div className="rumble-list">
          <h2>Current Rumbles</h2>
          {currentRumbleIds?.length ? (
            <>
              <Table.Header>
                <Table.Col>Date</Table.Col>
                <Table.Col>Status </Table.Col>
                {/* <Table.Col>No. of Student submissions</Table.Col> */}
                <Table.Col>Rumble details</Table.Col>
              </Table.Header>
              <Table.Body>
                {currentRumbleIds?.map((rId) => (
                  <SectionRumbleCard rumbleId={rId} key={rId} />
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="no-rumble">
              <div className="message-text-container">
                <p>There are no current rumbles in this class &nbsp;</p>
              </div>
              <img src={noStudents} alt="you have no rumbles" />
            </div>
          )}

          <h2>Past Rumbles</h2>
          {pastRumbleIds?.length ? (
            <>
              <Table.Header>
                <Table.Col>Date</Table.Col>
                <Table.Col>Day of the Week </Table.Col>
                {/* <Table.Col>No. of Student submissions</Table.Col> */}
                <Table.Col>Rumble details</Table.Col>
              </Table.Header>
              <Table.Body>
                {pastRumbleIds?.map((rId) => (
                  <SectionRumbleCard rumbleId={rId} key={rId} />
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="no-rumble">
              <div className="message-text-container">
                <p>There are no past rumbles in this class &nbsp;</p>
              </div>
              <img src={noStudents} alt="you have no past rumbles" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface IRenderSectionRumbleListProps {
  currentRumbleIds?: number[];
  pastRumbleIds?: number[];
}

export default RenderSectionRumbleList;
