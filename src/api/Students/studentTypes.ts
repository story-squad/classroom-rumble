import { IUser } from '../Auth';
import { ISubItem } from '../Submissions';

export interface IStudentWithSubmissions extends IUser {
  submissions: ISubItem[];
}
