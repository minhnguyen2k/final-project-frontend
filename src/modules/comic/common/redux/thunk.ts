import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';

export function fetchThunk(
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  auth = true,
  contentType?: string,
): ThunkAction<Promise<any>, AppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const res = await fetch(url, {
      credentials: 'include',
      method,
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      headers:
        contentType !== 'multipart/form-data'
          ? {
              'Content-Type': contentType || 'application/json',
            }
          : {},
      cache: 'no-store',
    });

    const json = await res.json();

    if (res.status === 401) {
      // dispatch logout, remove access token here.
    }

    return json;
    // throw new Error('Error');
  };
}
