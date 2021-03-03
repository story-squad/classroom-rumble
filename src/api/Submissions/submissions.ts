import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from './subTypes';

export const getSubsForStudentInSection = async (
  studentId: number,
  sectionId: number,
): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/students/${studentId}/submissions?sectionId=${sectionId}`,
  );
  return data;
};
