import { IComicInfo } from './comic';
export interface IFavoriteInfo {
  id?: string;
  bookId: string;
  userId?: string;
  Book?: IComicInfo;
  createdAt?: string;
}
