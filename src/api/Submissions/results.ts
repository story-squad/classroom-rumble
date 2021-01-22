import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';
import { getImageFromS3, SubItem } from './imageLoader';

export const getWinner = async (): Promise<SubItem> => {
  const { data }: AxiosResponse<SubItem> = await axiosWithAuth().get(
    '/ranking/winner',
  );
  return getImageFromS3(data);
};
