import React from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  sections,
  visible = true,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  if (!visible) return <></>;
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        <div className="rumble-list">
          {sections.length <= 0 ? (
            <div>
              <h3>Current Rumbles</h3>
              <p>You don&apos;t have any current rumbles.</p>
              <img src={emptyMail} alt="You don't have any current rumbles" />
            </div>
          ) : (
            <>
              {sections?.map((sec) =>
                sec.rumbles.map((rum) => (
                  <TeacherDashboardRumbleCard
                    key={rum.id}
                    section={sec}
                    rumble={rum}
                  />
                )),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
  visible?: boolean;
}

export default TeacherDashboardRumbleList;
