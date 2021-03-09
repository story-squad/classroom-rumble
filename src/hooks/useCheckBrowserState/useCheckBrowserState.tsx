import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Auth, Rumbles, Sections, Submissions } from '../../api';
import { current } from '../../state';

const useCheckBrowserState = (
  ...values: ('student' | 'sub' | 'section' | 'rumble')[]
): { isLoading: boolean } => {
  // Load router state
  const location = useLocation();
  const state = location.state as {
    section: Sections.ISectionWithRumbles;
    student: Auth.IUser;
    submission: Submissions.ISubItem;
    rumble: Rumbles.IRumbleWithSectionInfo;
  };

  // Set initial loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load recoil state values
  const [section, setSection] = useRecoilState(current.section);
  const [student, setStudent] = useRecoilState(current.student);
  const [rumble, setRumble] = useRecoilState(current.rumble);
  const [sub, setSub] = useRecoilState(current.sub);

  useEffect(() => {
    if (state) {
      if (!section && values.includes('section') && state.section) {
        setSection(state.section);
      }
      if (!student && values.includes('student') && state.student) {
        setStudent(state.student);
      }
      if (!rumble && values.includes('rumble') && state.rumble) {
        setRumble(state.rumble);
      }
      if (!sub && values.includes('sub') && state.submission) {
        setSub(state.submission);
      }
    }
    setIsLoading(false);
  }, []);

  return { isLoading };
};

export default useCheckBrowserState;
