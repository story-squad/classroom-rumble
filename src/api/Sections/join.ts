import { axiosWithAuth } from '../axiosWithConfig';
import { ISectionWithRumbles } from './sectionTypes';

export const joinSection = async (
  body: { joinCode: string },
  sectionId: number,
  studentId: number,
): Promise<ISectionWithRumbles> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/sections/${sectionId}/students/${studentId}`,
    body,
  );
  return data;
};
