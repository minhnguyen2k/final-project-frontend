import React from 'react';
import './App.css';
import Router from './Router';
import { ThemeConfig } from './theme/ThemeConfig';
import { Theme } from '@mui/material/styles';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
function App() {
  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
}

export default App;
