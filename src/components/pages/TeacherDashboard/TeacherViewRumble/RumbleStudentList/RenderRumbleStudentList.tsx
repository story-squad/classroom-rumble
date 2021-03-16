import React from 'react';
import { Sections, Students } from '../../../../../api';
import { Table } from '../../../../common';
import RumbleStudentCard from './RumbleStudentCard';

const RenderRumbleStudentList = ({
  studentList,
  section,
}: IRenderRumbleStudentListProps): React.ReactElement => {
  return (
    <div className="rumble-student-list-wrapper">
      <div className="rumble-student-list-container">
        <div className="rumble-student-list">
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
