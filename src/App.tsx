import React, { Suspense } from 'react';
import './App.css';
import Router from './Router';
import { ThemeConfig } from './theme/ThemeConfig';
import { Theme } from '@mui/material/styles';
import Loader from './modules/comic/common/Loader';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
function App() {
  return (
    <ThemeConfig>
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    </ThemeConfig>
  );
}

export default App;
