import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IRoleInfo } from '../../../../models/role';
import { IUserInfo } from '../../../../models/user';

export interface UserAdminState {
  userList: IUserInfo[];
  selectedUser: IUserInfo | null;
  roleList: IRoleInfo[];
}

export const setUserListInfo = createCustomAction('admin/user/setAllUserInfo', (payload: IUserInfo[]) => ({
  payload,
}));
export const setSelectedUserInfo = createCustomAction(
  'admin/user/setSelectedUserInfo',
  (payload: IUserInfo | null) => ({
    payload,
  }),
);
export const setRoleListInfo = createCustomAction('admin/user/setRoleListInfo', (payload: IRoleInfo[]) => ({
  payload,
}));

const actions = {
  setUserListInfo,
  setSelectedUserInfo,
  setRoleListInfo,
};

type Action = ActionType<typeof actions>;

export default function reducer(
  state: UserAdminState = {
    userList: [],
    selectedUser: null,
    roleList: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setUserListInfo):
      return { ...state, userList: action.payload };
    case getType(setSelectedUserInfo):
      return { ...state, selectedUser: action.payload };
    case getType(setRoleListInfo):
      return { ...state, roleList: action.payload };
    default:
      return state;
  }
}
