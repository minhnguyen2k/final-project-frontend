import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { componentsOverride } from './componentsOverride';
import { palette } from './palette';
import { shadows } from './shadow';
import { typography } from './typography';

interface Props {
  children: React.ReactNode;
}

export const ThemeConfig = (props: Props) => {
  const { children } = props;
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      shadows,
    }),
    [],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);
  // theme = responsiveFontSizes(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
