import { Components, Theme } from '@mui/material';

export const Button = (theme: Theme): Components<Omit<Theme, 'components'>> => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        startIcon: {
          marginRight: 6,
        },
        sizeLarge: {
          height: 48,
          fontSize: 16,
        },
        sizeMedium: {
          height: 42,
        },
        sizeSmall: {
          height: 36,
          padding: '8px 12px',
        },
      },
    },
  };
};
