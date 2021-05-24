import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import noStudents from '../../../../../assets/img/no_students.svg';
import { modals } from '../../../../../state';
import { Table } from '../../../../common';
import { InviteToSection } from '../../InviteToSection';
import RumbleStudentCard from './RumbleStudentCard';

const RenderRumbleStudentList = ({
  studentList,
  section,
}: IRenderRumbleStudentListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.inviteModalIsOpen);
  const openInviteModal = () => setInviteModalOpen(true);

  return (
    <div className="rumble-student-list-wrapper">
      <div className="rumble-student-list-container">
        <div className="rumble-student-list">
          <InviteToSection disableSectionPicker />
          {studentList.length > 0 ? (
            <>
              <Table.Header>
                <Table.Col>Student Name</Table.Col>
                <Table.Col>Last Name</Table.Col>
                <Table.Col>First Name</Table.Col>
                <Table.Col>Submission Status</Table.Col>
              </Table.Header>
              <Table.Body>
                {studentList.map((student) => (
                  <RumbleStudentCard
                    student={student}
                    section={section}
                    key={student.id}
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

interface IRenderRumbleStudentListProps {
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderRumbleStudentList;
