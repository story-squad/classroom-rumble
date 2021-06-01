import React from 'react';
import { useRecoilValue } from 'recoil';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import { rumbles } from '../../../../state';
import StudentDashboardRumbleCard from './StudentDashboardRumbleCard';

const StudentDashboardRumbleList = (): React.ReactElement => {
  const rumbleIds = useRecoilValue(rumbles.ids);

  return (
    <div className="student-dash-rumble-list-wrapper">
      <div className="student-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        {!rumbleIds || rumbleIds.length === 0 ? (
          // Div is for centering purposes
          <div className="no-rumbles">
            <div className="message-text-container">
              <p>You don&apos;t have any rumbles yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current rumbles" />
          </div>
        ) : (
          <div className="rumble-list">
            {rumbleIds?.map((id) => (
              <StudentDashboardRumbleCard key={id} rumbleId={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardRumbleList;
