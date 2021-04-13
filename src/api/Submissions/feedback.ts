import { axiosWithAuth } from './../axiosWithConfig';
import { ISubItem } from './subTypes';

// export const getSubmissionsForFeedback = async (): Promise<ISubItem[]> => {
//   return [
//     {
//       codename: 'A Codename',
//       id: 1,
//       prompt: 'This is a third test propmt.',
//       rotation: 0,
//       score: 0,
//       src:
//         'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/16/08/google-chloe-letter-edit.jpg?width=1368&auto=webp&quality=75',
//       userId: 1,
//     },
//     {
//       codename: 'CodenameTwo',
//       id: 2,
//       prompt: 'This is a third test propmt.',
//       rotation: 0,
//       score: 0,
//       src:
//         'https://thumbs.dreamstime.com/z/old-fashioned-handwriting-cursive-background-50317612.jpg',
//       userId: 2,
//     },
//     {
//       codename: 'CodenameThree',
//       id: 3,
//       prompt: 'This is a third test propmt.',
//       rotation: 0,
//       score: 0,
//       src:
//         'https://i.pinimg.com/564x/c7/b6/85/c7b68516a200ebb53c41b63041b02d35.jpg',
//       userId: 3,
//     },
//   ];
// };

export const getSubmissionsForFeedback = async (
  rumbleId: number,
  studentId: number,
): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get(
    `api/rumble/rumbles/${rumbleId}/feedback?studentId=${studentId}`,
  );
  return data;
};
