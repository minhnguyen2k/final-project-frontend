import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import LoginPage from './modules/auth/pages/LoginPage';
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
  ]);

  return routes;
};

export default Router;
