import React from 'react';
import { useSetRecoilState } from 'recoil';
import noStudents from '../../../../../assets/img/no_students.svg';
import { modals } from '../../../../../state';
import { Table } from '../../../../common';
import SectionStudentCard from './SectionStudentCard';

const RenderSectionStudentList = ({
  studentIds,
  sectionId,
}: IRenderSectionStudentListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.inviteModalIsOpen);
  const openInviteModal = () => setInviteModalOpen(true);

  return (
    <div className="student-list-wrapper">
      <div className="student-list-container">
        <div className="student-list">
          {studentIds.length > 0 ? (
            <>
              <Table.Header>
                <Table.Col>Student Name</Table.Col>
                <Table.Col>Last Name</Table.Col>
                <Table.Col>First Name</Table.Col>
                <Table.Col># of Submissions</Table.Col>
              </Table.Header>
              <Table.Body>
                {studentIds.map((id) => (
                  <SectionStudentCard
                    studentId={id}
                    sectionId={sectionId}
                    key={id}
                  />
                ))}
              </Table.Body>
            </>
          ) : (
            <div className="no-students">
              <div className="message-text-container">
                <p>There are no students in this class &nbsp;</p>
                <span>
                  <button onClick={openInviteModal}>Invite to Class</button>
                </span>
              </div>
              <img src={noStudents} alt="you have no students" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface IRenderSectionStudentListProps {
  studentIds: number[];
  sectionId: number;
}

export default RenderSectionStudentList;
