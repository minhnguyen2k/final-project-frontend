import React, { lazy } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './modules/admin/AdminPage';
import ComicChapCreate from './modules/admin/comic/pages/ComicChapCreate';
import ComicChapEdit from './modules/admin/comic/pages/ComicChapEdit';
import ComicChapImageList from './modules/admin/comic/pages/ComicChapImageList';
import ComicChapList from './modules/admin/comic/pages/ComicChapList';
import ComicCreate from './modules/admin/comic/pages/ComicCreate';
import ComicEdit from './modules/admin/comic/pages/ComicEdit';
import ComicList from './modules/admin/comic/pages/ComicList';
import UserEdit from './modules/admin/comic/pages/UserEdit';
import UserList from './modules/admin/comic/pages/UserList';
import LoginPage from './modules/auth/pages/LoginPage';
import SignUpPage from './modules/auth/pages/SignUpPage';
import ComicAuthorListPage from './modules/comic/pages/ComicAuthorListPage';
import ComicFavoritedPage from './modules/comic/pages/ComicFavoritedPage';
import ComicFilteredPage from './modules/comic/pages/ComicFilteredPage';
import ComicResultPage from './modules/comic/pages/ComicResultPage';
import ReadPage from './modules/comic/pages/ReadPage';

interface Props {}

const HomePage = lazy(() => import('./modules/comic/pages/HomePage'));
const ComicDetailPage = lazy(() => import('./modules/comic/pages/ComicDetailPage'));
const GenrePage = lazy(() => import('./modules/comic/pages/GenrePage'));

const Router = (props: Props) => {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/details/:id',
      element: <ComicDetailPage />,
    },
    {
      path: '/genres',
      element: <GenrePage />,
    },
    {
      path: '/genres/:id',
      element: <GenrePage />,
    },
    {
      path: '/comic/filter',
      element: <ComicFilteredPage />,
    },
    {
      path: '/comic/favorite',
      element: <ComicFavoritedPage />,
    },
    {
      path: '/comic/author/:authorId',
      element: <ComicAuthorListPage />,
    },
    {
      path: '/comic/search',
      element: <ComicResultPage />,
    },
    {
      path: '/comic/read/:bookName/:chapName/:id',
      element: <ReadPage />,
    },
    {
      path: '/comic/read/:bookName/:chapName/:id',
      element: <ReadPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/admin/*',
      element: (
        <ProtectedRoute requiredAdminRole>
          <AdminPage>
            <Routes>
              <Route path="pages/comics/manage-comic" element={<ComicList />} />
              <Route path="pages/comics/new-comic" element={<ComicCreate />} />
              <Route path="pages/comics/comic-detail/:id" element={<ComicEdit />} />
              <Route path="pages/comics/manage-comic-chap" element={<ComicChapList />} />
              <Route path="pages/comics/new-comic-chap" element={<ComicChapCreate />} />
              <Route path="pages/comics/comic-chap-detail/:id" element={<ComicChapEdit />} />
              <Route path="pages/comics/manage-comic-chap-image" element={<ComicChapImageList />} />
              <Route path="pages/comics/manage-user" element={<UserList />} />
              <Route path="pages/comics/user-detail/:id" element={<UserEdit />} />
            </Routes>
          </AdminPage>
        </ProtectedRoute>
      ),
    },
  ]);

  return routes;
};

export default Router;
