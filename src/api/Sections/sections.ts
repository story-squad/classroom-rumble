import { axiosWithAuth } from '../axiosWithConfig';

// GET a list of Teachers sections
export const getTeacherSections = async (
  teacherId: number,
): Promise<ISection[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/teachers/${teacherId}/sections`,
  );
  return data;
};

// GET a list of Student Sections
export const getStudentSections = async (
  studentId: number,
): Promise<ISection[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/students/${studentId}/sections`,
  );
  return data;
};

/**
 * INTERFACES
 */
export interface ISection {
  id: number;
  name: string;
  active: boolean;
  grade: string;
  subject: string;
  joinCode: string;
}

/**
 * Dummy Data for testing
 */
/**
 * const dummyData = [
  {
    name: 'Kathy Smith',
    active: true,
    grade: 'ten',
    subject: 'History',
    joinCode: '5xxa',
  },
  {
    name: 'Ken Smith',
    active: true,
    grade: 'eleven',
    subject: 'Math',
    joinCode: '5dda',
  },
  {
    name: 'Missy Smith',
    active: true,
    grade: 'nine',
    subject: 'Art',
    joinCode: '9rr1',
  },
];
 */
