import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from './modules/comic/HomePage';

interface Props {}

const Router = (props: Props) => {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/detail/:id',
      element: <HomePage />,
    },
  ]);

  return routes;
};

export default Router;
