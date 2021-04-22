import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import noStudents from '../../../../../assets/img/no-students.svg';
import { modals } from '../../../../../state';
import { Table } from '../../../../common';
import SectionStudentCard from './SectionStudentCard';

const RenderSectionStudentList = ({
  studentList,
  section,
}: IRenderSectionStudentListProps): React.ReactElement => {
  const setInviteModalOpen = useSetRecoilState(modals.invite.isOpen);
  const openInviteModal = () => setInviteModalOpen(true);

  return (
    <div className="student-list-wrapper">
      <div className="student-list-container">
        <div className="student-list">
          {studentList.length > 0 ? (
            <>
              <Table.Header>
                <Table.Col>Student Name</Table.Col>
                <Table.Col>Last Name</Table.Col>
                <Table.Col>First Name</Table.Col>
                <Table.Col># of Submissions</Table.Col>
              </Table.Header>
              <Table.Body>
                {studentList.map((student) => (
                  <SectionStudentCard
                    student={student}
                    section={section}
                    key={student.id}
                  />
                ))}
              </Table.Body>
            </>
          ) : (
            <div>
              <div className="message-text-container">
                <p>There are no students in this class &nbsp;</p>
                <button onClick={openInviteModal}>Invite to Class</button>
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
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderSectionStudentList;
