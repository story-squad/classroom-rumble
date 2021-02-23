import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface INewSectionBody {
  name: string; // The name of the class!
  subjectId: string; // We'll get these from the backend
  gradeId: string; // Getting these from the backend as well!
}

export const CreateNewSection = (
  body: INewSectionBody,
): Promise<AxiosResponse<INewSectionBody>> => {
  return axiosWithAuth().post('/api/rumble/teachers/:teacherID/sections', body);
};

// Endpoint: POST /api/rumble/teachers/:teacherId/sections
// when creating a section send a post request to this endpoint
