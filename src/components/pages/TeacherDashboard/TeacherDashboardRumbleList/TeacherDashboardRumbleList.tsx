import React from 'react';
import { Sections } from '../../../../api';
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
          <>
            {console.log(sections)}
            {sections?.map(
              (sec) =>
                // sec.rumbles.length > 0 ? (
                // TODO *BUG* Figure out why it is rerendering no current rumble for each class
                sec.rumbles.map((rum) => (
                  <TeacherDashboardRumbleCard
                    key={rum.id}
                    section={sec}
                    rumble={rum}
                  />
                )),
              // ) : (
              //   <div key={i}>
              //     <h3>Current Rumbles</h3>
              //     <p>You don&apos;t have any current rumbles.</p>
              //     <img
              //       src={emptyMail}
              //       alt="You don't have any current rumbles"
              //     />
              //   </div>
              // ),
            )}
          </>
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
