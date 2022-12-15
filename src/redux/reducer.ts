import comicReducer, { ComicState } from './../modules/comic/common/redux/comicReducer';
import comicAdminReducer, { ComicAdminState } from '../modules/admin/comic/redux/comicAdminReducer';
import comicReaderReducer, { ComicReaderState } from './../modules/comic/ComicReader/redux/comicReaderReducer';
import { combineReducers, Reducer } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import { RouterState } from 'redux-first-history';
import userAdminReducer, { UserAdminState } from '../modules/admin/comic/redux/userAdminReducer';

export interface AppState {
  router: RouterState;
  profile: AuthState;
  comicReader: ComicReaderState;
  comicAdmin: ComicAdminState;
  userAdmin: UserAdminState;
  comic: ComicState;
}
export default function createRootReducer(routerReducer: Reducer<RouterState>) {
  return combineReducers({
    router: routerReducer,
    comicReader: comicReaderReducer,
    profile: authReducer,
    comicAdmin: comicAdminReducer,
    userAdmin: userAdminReducer,
    comic: comicReducer,
  });
}
