import comicReaderReducer, { ComicReaderState } from './../modules/comic/ComicReader/redux/comicReaderReducer';
import { combineReducers, Reducer } from 'redux';
import { RouterState } from 'redux-first-history';

export interface AppState {
  comicReader: ComicReaderState;
}
export default function createRootReducer(routerReducer: Reducer<RouterState>) {
  return combineReducers({
    router: routerReducer,
    comicReader: comicReaderReducer,
  });
}
