// eslint-disable-next-line no-unused-vars
enum APIService {
  auth,
  protected,
  cloudinary,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${process.env.REACT_APP_API_URL}/api/auth`;
  } else if (service === APIService.protected) {
    return `${process.env.REACT_APP_API_URL}/api/protected`;
  } else if (service === APIService.public) {
    console.log(process.env.REACT_APP_API_URL);
    return `${process.env.REACT_APP_API_URL}/api`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  register: `${getBaseUrl(APIService.auth)}/register`,
  popularBook: `${getBaseUrl(APIService.public)}/books/popular`,
  newReleaseBook: `${getBaseUrl(APIService.public)}/books/new-release`,
  newReleaseBookChapter: `${getBaseUrl(APIService.public)}/books/new-release-chapter`,
  topBook: `${getBaseUrl(APIService.public)}/books/top-book`,
  actionBook: `${getBaseUrl(APIService.public)}/books/action-book`,
  bookById: `${getBaseUrl(APIService.public)}/books`,
  allBooks: `${getBaseUrl(APIService.public)}/books`,
  allBooksWithNotPagination: `${getBaseUrl(APIService.public)}/books/all-book`,
  allGenres: `${getBaseUrl(APIService.public)}/genres`,
  genreById: `${getBaseUrl(APIService.public)}/genres`,
  allChapImage: `${getBaseUrl(APIService.public)}/chap-images`,
  currentUser: `${getBaseUrl(APIService.public)}/users/current-user`,
  allAuthors: `${getBaseUrl(APIService.public)}/authors`,
  signCloudinary: `${getBaseUrl(APIService.auth)}/sign-cloudinary`,
  uploadImage: 'https://api.cloudinary.com/v1_1/com-sys/image/upload',
  createBook: `${getBaseUrl(APIService.public)}/books`,
  updateBook: `${getBaseUrl(APIService.public)}/books/edit`,
  deleteBook: `${getBaseUrl(APIService.public)}/books`,
  allChaps: `${getBaseUrl(APIService.public)}/chaps`,
  createChap: `${getBaseUrl(APIService.public)}/chaps`,
  updateChap: `${getBaseUrl(APIService.public)}/chaps/edit`,
  deleteChap: `${getBaseUrl(APIService.public)}/chaps`,
  createChapImage: `${getBaseUrl(APIService.public)}/chap-images`,
  updateChapImage: `${getBaseUrl(APIService.public)}/chap-images/edit`,
  deleteChapImage: `${getBaseUrl(APIService.public)}/chap-images`,
  filterBook: `${getBaseUrl(APIService.public)}/books/filter-books`,
  searchBook: `${getBaseUrl(APIService.public)}/books/search`,
  allUsers: `${getBaseUrl(APIService.public)}/users`,
  allRoles: `${getBaseUrl(APIService.public)}/roles`,
  updateUser: `${getBaseUrl(APIService.public)}/users/edit`,
  deleteUser: `${getBaseUrl(APIService.public)}/users`,
  createComment: `${getBaseUrl(APIService.public)}/comments`,
  getAllCommentByBook: `${getBaseUrl(APIService.public)}/comments`,
};
