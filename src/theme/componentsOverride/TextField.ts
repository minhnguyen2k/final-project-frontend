import { Components, Theme } from '@mui/material';

export const TextField = (theme: Theme): Components<Omit<Theme, 'components'>> => {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        input: {
          // padding: '11px 12px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        input: {
          padding: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              // background: theme.palette.grey[200],
            },
          },
        },
      },
    },
  };
};
