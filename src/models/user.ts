import { IRoleInfo } from './role';
export interface IUserInfo {
  id?: string;
  email: string;
  username: string;
  password?: string;
  roleId: string;
  Role?: IRoleInfo;
}
