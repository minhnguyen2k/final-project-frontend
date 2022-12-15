import { IChapInfo } from './chap';
import { IAuthorInfo } from './author';
import { IGenreInfo } from './genre';
export interface IComicInfo {
  id?: string;
  name: string;
  description: string;
  image: string;
  viewCount: number;
  voteCount: number;
  Authors?: IAuthorInfo[];
  Chaps?: IChapInfo[];
  Genres?: IGenreInfo[];
}
export interface ChapTotal {
  id: string;
  chapTotal: number;
}
export interface IFilterComic {
  genreId: string;
  chapCount: number;
  sortBy: string;
}
