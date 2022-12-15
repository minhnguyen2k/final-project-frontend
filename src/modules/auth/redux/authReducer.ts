import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IUserInfo } from '../../../models/user';

export interface AuthState {
  user?: IUserInfo;
}

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUserInfo | null) => ({
  data,
}));

const actions = { setUserInfo };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setUserInfo):
      return { ...state, user: action.data };
    default:
      return state;
  }
}
