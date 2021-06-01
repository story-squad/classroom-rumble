import React from 'react';
import { useRecoilValue } from 'recoil';
import { Rumbles } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import { rumbles } from '../../../../state';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  phases = ['ACTIVE', 'FEEDBACK', 'INACTIVE', 'COMPLETE'],
  title,
  sectionIds,
  visible = true,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  const currentRumbles = useRecoilValue(
    rumbles.get({
      phases,
    }),
  );

  if (!visible) return <></>;
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        {title && <h2>{title}</h2>}
        {!sectionIds || currentRumbles?.length === 0 ? (
          // If there are no sections show that there is alsp no rubmles
          // Div is for centering purposes
          <div className="no-rumbles">
            <div className="message-text-container">
              <p>You don&apos;t have any rumbles yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current rumbles" />
          </div>
        ) : (
          <div className="rumble-list">
            {currentRumbles?.map((id) => (
              <TeacherDashboardRumbleCard key={id} rumbleId={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sectionIds: number[];
  visible?: boolean;
  phases?: Rumbles.RumblePhases[];
  title?: string;
}

export default TeacherDashboardRumbleList;
