import { IComicInfo } from './../../../../models/comic';

import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ComicReaderState {
  comicInfo?: IComicInfo;
}

export const setComicInfoAction = createCustomAction('comicReader/setComicInfo', (payload: IComicInfo) => {
  return {
    payload,
  };
});

const actions = {
  setComicInfoAction,
};

type Action = ActionType<typeof actions>;

export default function reducer(state: ComicReaderState = {}, action: Action) {
  switch (action.type) {
    case getType(setComicInfoAction):
      return { ...state, comicInfo: action.payload };
    default:
      return state;
  }
}
