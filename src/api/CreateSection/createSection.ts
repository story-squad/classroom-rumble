import { axiosWithAuth } from '../axiosWithConfig';

export const getSectionData = async (): Promise<IData[]> => {
  // const { data } = await axiosWithAuth().get('/api/rumble/data');
  // return data;
  return Promise.resolve(dummyData);
};

export const CreateNewSection = async (
  body: INewSectionBody,
  teacherId: number,
): Promise<IFullSection> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/teachers/${teacherId}/sections`,
    body,
  );
  return data;
};

const dummyData = [
  {
    grades: [
      { gradeId: '0', value: '3' },
      { gradeId: '1', value: '4' },
      { gradeId: '2', value: '5' },
      { gradeId: '3', value: '6' },
    ],
    subjects: [
      { subjectId: '3', value: 'Math' },
      { subjectId: '4', value: 'Art' },
      { subjectId: '5', value: 'English' },
      { subjectId: '6', value: 'Science' },
    ],
  },
];

export interface IGrade {
  gradeId: string;
  grade: number;
}

export interface ISubject {
  subjectId: string;
  subject: string;
}

export interface IData {
  grades: { gradeId: string; value: string }[];
  subjects: { subjectId: string; value: string }[];
}

export interface INewSectionBody {
  name: string; // The name of the class!
  subjectId: string; // We'll get these from the backend
  gradeId: string; // Getting these from the backend as well!
}

export interface IFullSection extends INewSectionBody {
  joinCode: string;
  id: number;
  active: boolean;
}
