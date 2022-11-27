import { IComicInfo } from './comic';
export interface IGenreInfo {
  id?: string;
  name: string;
  description: string;
  Books?: IComicInfo[];
}
