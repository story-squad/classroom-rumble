import { URLSearchParams } from 'url';
import { axiosWithAuth } from '../axiosWithConfig';
import { ISubItem } from './subTypes';

export const getSubsForStudentInSection = async (
  studentId: number,
  sectionId: number,
): Promise<ISubItem[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/rumble/students/${studentId}/submissions?sectionId=${sectionId}`,
  );
  return data;
};

export const submitStory = async (body: FormData): Promise<ISubItem> => {
  const { data } = await axiosWithAuth().post(
    `/api/submissions?sourceId=2`,
    body,
  );
  return data;
};

export const get = async (config: IGetQuery): Promise<ISubItem[]> => {
  const query = new URLSearchParams({
    // first: config.first ? 'true' : 'false',
    limit: `${config.limit}` ?? '',
    offset: `${config.offset}` ?? '',
    orderBy: `${config.orderBy}` ?? '',
    order: `${config.order}` ?? '',
    ids: (config.ids ?? [])?.join(','),
  }).toString();
  const { data } = await axiosWithAuth().get('/api/submissions?' + query);
  return data;
};

export type OrderDirection = 'DESC' | 'ASC';
// Temporarily disabling 'first' to get this working right
export interface IGetQuery<B = boolean, K = string, IdType = number> {
  first?: B;
  limit?: number;
  offset?: number;
  orderBy?: K;
  order?: OrderDirection;
  ids?: IdType[];
}
