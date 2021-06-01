import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Rumbles, Sections, Students, Submissions } from '../../api';
import { rumbles, sections, students, submissions } from '../../state';

const useCheckBrowserState = (
  ...values: ('student' | 'sub' | 'section' | 'rumble')[]
): { isLoading: boolean } => {
  // Load router state
  const location = useLocation();
  const state = location.state as {
    section: Sections.ISectionWithRumbles;
    student: Students.IStudentWithSubmissions;
    submission: Submissions.ISubItem;
    rumble: Rumbles.IRumbleWithSectionInfo;
  };

  // Set initial loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load recoil state values
  const [section, setSection] = useRecoilState(sections.selected);
  const [student, setStudent] = useRecoilState(students.selected);
  const [rumble, setRumble] = useRecoilState(rumbles.selected);
  const [sub, setSub] = useRecoilState(submissions.selected);

  useEffect(() => {
    if (state) {
      if (!section && values.includes('section') && state.section) {
        setSection(state.section.id);
      }
      if (!student && values.includes('student') && state.student) {
        setStudent(state.student.id);
      }
      if (!rumble && values.includes('rumble') && state.rumble) {
        setRumble(state.rumble.id);
      }
      if (!sub && values.includes('sub') && state.submission) {
        setSub(state.submission.id);
      }
    }
    setIsLoading(false);
  }, []);

  return { isLoading };
};

export default useCheckBrowserState;
