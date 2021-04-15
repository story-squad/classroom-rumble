import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from '../Submissions';
import { IStudentWithSubmissions } from './studentTypes';

export const getWithSubsByRumbleId = async (
  rumbleId: number,
): Promise<IStudentWithSubmissions[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/rumbles/${rumbleId}/students`,
  );
  return data;
};

export const getWithSubsBySectionId = async (
  sectionId: number,
): Promise<IStudentWithSubmissions[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/sections/${sectionId}/students`,
  );
  return data;
};

export const getSubForRumble = async (
  rumbleId: number,
  studentId: number,
): Promise<ISubItem> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/rumbles/${rumbleId}/students/${studentId}`,
  );
  return data;
};
