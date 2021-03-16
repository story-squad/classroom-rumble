import { Sections } from '../../api';

export const joinCode = (
  section: Sections.ISectionWithRumbles | Sections.ISection,
): string => `http://localhost:3000/dashboard/student/join?joinCode=
${section.joinCode}
&sectionId=${section.id}`;
