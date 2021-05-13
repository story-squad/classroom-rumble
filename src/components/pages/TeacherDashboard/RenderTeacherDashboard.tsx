import React from 'react';
import { Sections } from '../../../api';
import { Loader, WelcomeModal } from '../../common';
import { PromptQueueDisplay } from './PromptQueueDisplay';
import { TeacherDashboardRumbleList } from './TeacherDashboardRumbleList';
import { TeacherDashboardSectionList } from './TeacherDashboardSectionList';

const RenderTeacherDashboard = ({
  sectionList,
}: IRenderTeacherDashboardProps): React.ReactElement => {
  return (
    <div className="teacher-dashboard">
      <WelcomeModal />
      <PromptQueueDisplay />

      {sectionList ? (
        <>
          <TeacherDashboardRumbleList
            sections={sectionList}
            phases={['ACTIVE', 'FEEDBACK', 'INACTIVE']}
            title="Current Rumbles"
          />
          <TeacherDashboardSectionList sections={sectionList} />
        </>
      ) : (
        <Loader message={'Loading sections'} />
      )}
    </div>
  );
};

interface IRenderTeacherDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default RenderTeacherDashboard;
