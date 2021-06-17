import React from 'react';
import { useRecoilValue } from 'recoil';
import { sections } from '../../../state';
import { Loader, WelcomeModal } from '../../common';
import { PromptQueueDisplay } from './PromptQueueDisplay';
import { TeacherDashboardRumbleList } from './TeacherDashboardRumbleList';
import { TeacherDashboardSectionList } from './TeacherDashboardSectionList';

const RenderTeacherDashboard = (): React.ReactElement => {
  const sectionIds = useRecoilValue(sections.ids);

  return (
    <div className="teacher-dashboard">
      <WelcomeModal isTeacher />
      <PromptQueueDisplay />
      {sectionIds ? (
        <>
          <TeacherDashboardRumbleList
            sectionIds={sectionIds}
            phases={['ACTIVE', 'FEEDBACK', 'INACTIVE']}
            title="Current Rumbles"
          />
          <TeacherDashboardSectionList sectionIds={sectionIds} />
        </>
      ) : (
        <Loader message={'Loading sections'} />
      )}
    </div>
  );
};

export default RenderTeacherDashboard;
