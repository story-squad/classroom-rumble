import { Sections } from '../../api';

const REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:3000';

export const joinCode = (
  section: Sections.ISectionWithRumbles | Sections.ISection,
): string =>
  `${REACT_APP_URL}/dashboard/student/join?joinCode=${section.joinCode}&sectionId=${section.id}`;
