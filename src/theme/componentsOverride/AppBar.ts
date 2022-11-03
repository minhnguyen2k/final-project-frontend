import { Components, Theme } from '@mui/material';

export const AppBar = (theme: Theme): Components<Omit<Theme, 'components'>> => {
  return {
    MuiAppBar: {
      styleOverrides: {},
    },
  };
};
