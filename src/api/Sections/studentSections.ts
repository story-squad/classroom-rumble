import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

// Return a list of sections for a student
export const getStudentSection = async (
  body: ISection,
): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post(
    '/api/rumble/students/:studentId/sections',
    body,
  );
};

// Interface for a Student Section
export interface ISection {
  name: string;
  active: boolean;
  grade: string;
  subject: string;
  joinCode: string;
}
