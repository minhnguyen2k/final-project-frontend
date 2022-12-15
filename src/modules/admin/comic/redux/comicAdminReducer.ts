import { IChapInfo } from './../../../../models/chap';
import { IGenreInfo } from './../../../../models/genre';
import { IAuthorInfo } from './../../../../models/author';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IComicInfo } from '../../../../models/comic';

export interface ComicAdminState {
  comicList: IComicInfo[];
  selectedComic: IComicInfo | null;
  authorList: IAuthorInfo[];
  genreList: IGenreInfo[];
  comicChapList: IChapInfo[];
  selectedComicChap: IChapInfo | null;
}

export const setComicListInfo = createCustomAction('admin/comic/setAllComicInfo', (payload: IComicInfo[]) => ({
  payload,
}));
export const setSelectedComicInfo = createCustomAction(
  'admin/comic/setSelectedComicInfo',
  (payload: IComicInfo | null) => ({
    payload,
  }),
);
export const setAuthorListInfo = createCustomAction('admin/comic/setAuthorListInfo', (payload: IAuthorInfo[]) => ({
  payload,
}));
export const setGenreListInfo = createCustomAction('admin/comic/setGenreListInfo', (payload: IGenreInfo[]) => ({
  payload,
}));
export const setChapListInfo = createCustomAction('admin/comic/setChapListInfo', (payload: IChapInfo[]) => ({
  payload,
}));
export const setSelectedComicChapInfo = createCustomAction(
  'admin/comic/setSelectedComicChapInfo',
  (payload: IChapInfo | null) => ({
    payload,
  }),
);
const actions = {
  setComicListInfo,
  setSelectedComicInfo,
  setAuthorListInfo,
  setGenreListInfo,
  setChapListInfo,
  setSelectedComicChapInfo,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ComicAdminState = {
    comicList: [],
    selectedComic: null,
    authorList: [],
    genreList: [],
    comicChapList: [],
    selectedComicChap: null,
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setComicListInfo):
      return { ...state, comicList: action.payload };
    case getType(setSelectedComicInfo):
      return { ...state, selectedComic: action.payload };
    case getType(setAuthorListInfo):
      return { ...state, authorList: action.payload };
    case getType(setGenreListInfo):
      return { ...state, genreList: action.payload };
    case getType(setChapListInfo):
      return { ...state, comicChapList: action.payload };
    case getType(setSelectedComicChapInfo):
      return { ...state, selectedComicChap: action.payload };
    default:
      return state;
  }
}
