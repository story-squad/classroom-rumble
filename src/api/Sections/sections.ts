const dummyData = [
  {
    name: 'Kathy Smith',
    active: true,
    grade: 'ten',
    subject: 'History',
    joinCode: '5xxa',
  },
  {
    name: 'Ken Smith',
    active: true,
    grade: 'eleven',
    subject: 'Math',
    joinCode: '5dda',
  },
  {
    name: 'Missy Smith',
    active: true,
    grade: 'nine',
    subject: 'Art',
    joinCode: '9rr1',
  },
];

export interface ISection {
  name: string;
  active: boolean;
  grade: string;
  subject: string;
  joinCode: string;
}

export const getSections = async (teacherId: number): Promise<ISection[]> => {
  // const { data } = await axiosWithAuth().get(
  //   `/api/rumble/teachers/${teacherId}/sections`,
  // );
  // return data;
  return Promise.resolve(dummyData);
};
