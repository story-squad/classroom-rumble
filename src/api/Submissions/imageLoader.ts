import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface SubItem {
  id: number;
  userId: number;
  username: string;
  image: string;
  src: string;
  rotation: number;
  prompt: string;
  score: number;
}

export const getImageFromS3 = async (sub: SubItem): Promise<SubItem> => {
  const res: AxiosResponse<ArrayBuffer> = await axiosWithAuth().get(
    `/contest/submission/${sub.image}`,
    {
      responseType: 'arraybuffer',
    },
  );
  const image = btoa(
    new Uint8Array(res.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
  const src = `data:${res.headers[
    'content-type'
  ].toLowerCase()};base64,${image}`;
  return { ...sub, src };
};
