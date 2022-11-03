import { combineReducers, Reducer } from 'redux';
import { RouterState } from 'redux-first-history';

export default function createRootReducer(routerReducer: Reducer<RouterState>) {
  return combineReducers({
    router: routerReducer,
  });
}
