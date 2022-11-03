import createSagaMiddleware from '@redux-saga/core';
import { createBrowserHistory } from 'history';
import { Action, applyMiddleware, compose, createStore } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk, { ThunkAction } from 'redux-thunk';
import createRootReducer from './reducer';
import rootSaga from './sagas';

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
};

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  //other options if needed
});

function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, createRootReducer(routerReducer));

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware, // for dispatching history actions
        thunk,
        sagaMiddleware,
        // ... other middlewares ...
      ),
    ),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

export const { store, persistor } = configureStore({});

export const history = createReduxHistory(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkActionDispatch<T> = ThunkAction<Promise<T>, AppState, null, Action<string>>;

export const routerStateSelector = (state: AppState) => state.router;
