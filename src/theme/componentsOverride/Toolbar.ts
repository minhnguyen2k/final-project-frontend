import { Components, Theme } from '@mui/material';

export const Toolbar = (theme: Theme): Components<Omit<Theme, 'components'>> => {
  return {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 60,
          minHeight: 60,
        },
      },
    },
  };
};
