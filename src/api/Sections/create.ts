import { axiosWithAuth } from '../axiosWithConfig';
import {
  INewSectionBody,
  ISectionEnumData,
  ISectionWithRumbles,
} from './sectionTypes';

export const createNewSection = async (
  body: INewSectionBody,
  teacherId: number,
): Promise<ISectionWithRumbles> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/teachers/${teacherId}/sections`,
    body,
  );
  return { ...data, rumbles: [] };
};

export const getSectionEnumData = async (): Promise<ISectionEnumData> => {
  const { data } = await axiosWithAuth().get('/api/rumble/data');
  return data;
  // return Promise.resolve(dummyData);
};

// const dummyData = [
//   {
//     grades: [
//       { gradeId: '0', value: '3' },
//       { gradeId: '1', value: '4' },
//       { gradeId: '2', value: '5' },
//       { gradeId: '3', value: '6' },
//     ],
//     subjects: [
//       { subjectId: '3', value: 'Math' },
//       { subjectId: '4', value: 'Art' },
//       { subjectId: '5', value: 'English' },
//       { subjectId: '6', value: 'Science' },
//     ],
//   },
// ];
