import { AxiosResponse } from 'axios';
import { TableItem } from '../../components/common/Table/TableTypes';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const getScoreboard = async (): Promise<ProcessedScoreboardItem[]> => {
  const {
    data,
  }: AxiosResponse<ScoreboardItem[]> = await axiosWithoutAuth().get(
    '/leaderboard',
  );
  return Promise.resolve(processScoreboardData(data));
};

export const processScoreboardData = (
  data: ScoreboardItem[],
): ProcessedScoreboardItem[] => {
  return data.map((d, i) => ({
    username: d.username,
    score: Math.round(d.score),
    placement: i + 1,
  }));
};

export const ScoreboardHeadings = [
  { display: 'Placement', propName: 'placement' },
  { display: 'Codename', propName: 'username' },
  { display: 'Score', propName: 'score' },
];

export interface ScoreboardItem extends TableItem {
  username: string;
  score: number;
}

export interface ProcessedScoreboardItem extends ScoreboardItem {
  placement: number;
}
