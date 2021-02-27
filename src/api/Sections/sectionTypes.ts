import { Select } from '../../components/common';

export interface ISection extends INewSectionBody {
  id: number;
  active: boolean;
  joinCode: string;
}

export interface INewSectionBody {
  name: string; // The name of the class!
  subjectId: string; // We'll get these from the backend
  gradeId: string; // Getting these from the backend as well!
}

export interface ISectionEnumData {
  grades: Select.IOption[];
  subjects: Select.IOption[];
}
