export interface ILoginParams {
  email: string;
  password: string;
}
export interface ISignUpParams {
  email: string;
  username: string;
  password: string;
  roleId: string;
  confirmPassword?: string;
}
