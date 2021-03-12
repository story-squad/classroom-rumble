import React from 'react';
import { Sections } from '../../../../api';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  sections,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        <div className="rumble-list">
          {sections?.map((sec) =>
            sec.rumbles.map((rum) => (
              <TeacherDashboardRumbleCard
                key={rum.id}
                section={sec}
                rumble={rum}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default TeacherDashboardRumbleList;
