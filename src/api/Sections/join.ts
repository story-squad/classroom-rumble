import { axiosWithAuth } from '../axiosWithConfig';
import { ISection } from './sectionTypes';

export const joinSection = async (
  body: { joinCode: string },
  sectionId: number,
  studentId: number,
): Promise<ISection> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/sections/${sectionId}/students/${studentId}`,
    body,
  );
  return data;
};
