import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IGenreInfo } from '../../../../models/genre';

export interface ComicState {
  genreList: IGenreInfo[];
}

export const setGenreListInfo = createCustomAction('comic/setGenreListInfo', (payload: IGenreInfo[]) => ({
  payload,
}));

const actions = {
  setGenreListInfo,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ComicState = {
    genreList: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setGenreListInfo):
      return { ...state, genreList: action.payload };
    default:
      return state;
  }
}
