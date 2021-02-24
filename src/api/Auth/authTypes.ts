export interface ILoginBody {
  codename: string;
  password: string;
}

export interface IAuthResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}

export interface IUser {
  id: number;
  isValidated: boolean;
  codename: string;
  email: string;
  roleId: number;
  created_at: Date;
  updated_at: Date;
  firstname: string;
  lastname: string;
  parentEmail?: string;
  age?: number;
}

export enum Roles {
  'user' = 1,
  'teacher' = 2,
  'admin' = 3,
}
export interface SignupFormState extends Omit<ISignUpBody, 'age'> {
  ageStr: string;
  confirm: string;
}

export interface ISignUpBody {
  firstname: string;
  lastname: string;
  codename: string;
  email: string;
  password: string;
  parentEmail: string;
  age: number;
}
