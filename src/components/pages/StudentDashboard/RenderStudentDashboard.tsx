import React from 'react';
import { StudentSectionList } from './StudentSectionList';

/**TODO
 * Take in props from container conponenet `./StudentDashboardContainer`
 * Create placeholders for props within jsx for the ISection
 */

// Dislay Compoent for Students to view thier sections
const RenderStudentDashboard = (): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashbaord</h1>
      <StudentSectionList />
    </div>
  );
};

export default RenderStudentDashboard;
