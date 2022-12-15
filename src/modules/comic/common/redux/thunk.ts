import Cookies from 'js-cookie';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';

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
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers:
        contentType !== 'multipart/form-data'
          ? {
              'Content-Type': contentType || 'application/json',
              Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
            }
          : {
              Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
            },

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
