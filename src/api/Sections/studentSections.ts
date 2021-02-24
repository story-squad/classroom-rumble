// import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

// Return a list of sections for a student
export const getStudentSections = async (): Promise<ISection[]> => {
  const { data } = await axiosWithAuth().get(
    '/api/rumble/students/:studentId/sections',
  );
  return data;
};

// Interface for a Student Section
export interface ISection {
  id: number;
  name: string;
  active: boolean;
  grade: string;
  subject: string;
  joinCode: string;
}

// Use to test dummy data if API is not hooked up
// const { data } = await axiosWithAuth().post(
//   '/api/rumble/students/:studentId/sections',
//   testData,
// );

// return data;
// const testData = [
//   {
//     name: 'Ben',
//     active: true,
//     grade: '4',
//     subject: 'Math',
//     joinCode: 'asd5f445asdf',
//   },
//   {
//     name: 'Ben',
//     active: false,
//     grade: '3',
//     subject: 'English',
//     joinCode: 'asd5f445',
//   },
//   {
//     name: 'Ben',
//     active: true,
//     grade: '2',
//     subject: 'Science',
//     joinCode: 'asdf',
//   },
// ];
