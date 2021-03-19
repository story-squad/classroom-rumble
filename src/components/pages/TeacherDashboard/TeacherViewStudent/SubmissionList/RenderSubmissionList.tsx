import React from 'react';
import { Auth, Submissions } from '../../../../../api';
import { Table } from '../../../../common';
import SubmissionCard from './SubmissionCard';

const RenderSubmissionList = ({
  submissionList,
}: IRenderSubmissionListProps): React.ReactElement => {
  return (
    <div className="submission-list-wrapper">
      <div className="submission-list-container">
        <div className="submission-list">
          <Table.Header>
            <Table.Col>Prompt</Table.Col>
            <Table.Col>Score</Table.Col>
          </Table.Header>
          <Table.Body>
            {submissionList.map((sub) => (
              <SubmissionCard {...sub} key={sub.id} />
            ))}
          </Table.Body>
        </div>
      </div>
    </div>
  );
};

interface IRenderSubmissionListProps {
  submissionList: Submissions.ISubItem[];
  student: Auth.IUser;
}

export default RenderSubmissionList;
