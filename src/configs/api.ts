import { APIHost } from '../utils/constants';

// eslint-disable-next-line no-unused-vars
enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  register: `${getBaseUrl(APIService.auth)}/register`,
  popularBook: `${getBaseUrl(APIService.public)}/books/popular`,
  newReleaseBook: `${getBaseUrl(APIService.public)}/books/new-release`,
  topBook: `${getBaseUrl(APIService.public)}/books/top-book`,
  actionBook: `${getBaseUrl(APIService.public)}/books/action-book`,
  bookById: `${getBaseUrl(APIService.public)}/books`,
  allBooks: `${getBaseUrl(APIService.public)}/books`,
  allGenres: `${getBaseUrl(APIService.public)}/genres`,
  genreById: `${getBaseUrl(APIService.public)}/genres`,
  allChapImage: `${getBaseUrl(APIService.public)}/chap-images`,
};
