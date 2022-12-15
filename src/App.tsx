import React, { Suspense } from 'react';
import './App.css';
import Router from './Router';
import { ThemeConfig } from './theme/ThemeConfig';
import { Theme } from '@mui/material/styles';
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
function App() {
  return (
    <ThemeConfig>
      <Suspense fallback={<Loader />}>
        <Router />
        <ToastContainer
          enableMultiContainer
          containerId={'A'}
          position="top-right"
          autoClose={3000}
          pauseOnFocusLoss
          pauseOnHover
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          draggable={false}
          limit={2}
        />
        <ToastContainer
          enableMultiContainer
          containerId={'B'}
          position="top-center"
          autoClose={3000}
          pauseOnFocusLoss
          pauseOnHover
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          draggable={false}
          limit={2}
        />
      </Suspense>
    </ThemeConfig>
  );
}

export default App;
