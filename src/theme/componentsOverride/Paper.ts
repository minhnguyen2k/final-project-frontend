import { Components, Theme } from '@mui/material';

export const Paper = (theme: Theme): Components<Omit<Theme, 'components'>> => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  };
};
