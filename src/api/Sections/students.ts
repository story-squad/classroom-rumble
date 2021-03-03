import { IUser } from '../Auth';
import { axiosWithAuth } from '../axiosWithConfig';

export const getStudentsBySectionId = async (
  sectionId: number,
): Promise<IUser[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/sections/${sectionId}/students`,
  );
  return data;
};
