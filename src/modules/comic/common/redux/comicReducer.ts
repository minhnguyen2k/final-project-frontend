import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ICommentInfo } from '../../../../models/comment';
import { IGenreInfo } from '../../../../models/genre';

export interface ComicState {
  genreList: IGenreInfo[];
  commentList: ICommentInfo[];
}

export const setGenreListInfo = createCustomAction('comic/setGenreListInfo', (payload: IGenreInfo[]) => ({
  payload,
}));

export const setCommentListInfo = createCustomAction('comic/setCommentListInfo', (payload: ICommentInfo[]) => ({
  payload,
}));

const actions = {
  setGenreListInfo,
  setCommentListInfo,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ComicState = {
    genreList: [],
    commentList: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setGenreListInfo):
      return { ...state, genreList: action.payload };
    case getType(setCommentListInfo):
      return { ...state, commentList: action.payload };
    default:
      return state;
  }
}
