import { IUserInfo } from './user';
export interface ICommentInfo {
  id?: string;
  bookId: string;
  userId?: string;
  createdAt?: string;
  User?: IUserInfo;
  content: string;
}
