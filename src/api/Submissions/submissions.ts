import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { getImageFromS3, SubItem } from './imageLoader';

export const getMySubmissions = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/upload/mysubmissions',
  );
  const processedStories = data.map((sub) => getImageFromS3(sub));
  // const processedStories: SubItem[] = [];
  // const processedStories = [
  //   {
  //     id: 1,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg',
  //     userId: 1,
  //     username: 'A Username',
  //     score: 45,
  //   },
  //   {
  //     id: 2,
  //     image: '1231dwqsad',
  //     prompt:
  //       "Some prompt beleivable yes but let's make it even longer to test how long prompts look",
  //     rotation: 0,
  //     src:
  //       'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  //     userId: 1,
  //     username: 'DontBeAHater',
  //     score: 45,
  //   },
  //   {
  //     id: 3,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://cdn141.picsart.com/330612298074201.jpg?type=webp&to=crop&r=256',
  //     userId: 1,
  //     username: 'A Username',
  //     score: 45,
  //   },
  //   {
  //     id: 4,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://cdn141.picsart.com/330612298074201.jpg?type=webp&to=crop&r=256',
  //     userId: 1,
  //     username: 'A Username',
  //     score: 45,
  //   },
  //   {
  //     id: 5,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://cdn141.picsart.com/330612298074201.jpg?type=webp&to=crop&r=256',
  //     userId: 1,
  //     username: 'A Username',
  //     score: 45,
  //   },
  // ];
  return Promise.all(processedStories);
};

export const getTop3Subs = async (): Promise<SubItem[]> => {
  const { data }: AxiosResponse<SubItem[]> = await axiosWithAuth().get(
    '/ranking',
  );
  const processedStories = data.map((sub) => getImageFromS3(sub));
  // const processedStories = [
  //   {
  //     id: 1,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/landscaping-ideas-1582321830.jpg',
  //     userId: 1,
  //     username: 'A Username',
  //   },
  //   {
  //     id: 1,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
  //     userId: 1,
  //     username: 'A Username',
  //   },
  //   {
  //     id: 1,
  //     image: '1231dwqsad',
  //     prompt: 'Some prompt beleivable yes',
  //     rotation: 0,
  //     src:
  //       'https://cdn141.picsart.com/330612298074201.jpg?type=webp&to=crop&r=256',
  //     userId: 1,
  //     username: 'A Username',
  //   },
  // ];
  return Promise.all(processedStories);
};

export const uploadSubmission = (reqBody: FormData): Promise<AxiosResponse> => {
  // TODO
  return axiosWithAuth().post('/upload', reqBody);
};
