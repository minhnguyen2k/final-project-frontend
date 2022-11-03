import SVNSofiaProRegular from '../../fonts/SVN-Sofia Pro/SVN-SofiaPro-Regular.woff2';
import SVNSofiaProMedium from '../../fonts/SVN-Sofia Pro/SVN-SofiaPro-Medium.woff2';

export const CssBaseline = () => {
  return {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'SVN-Sofia Pro Regular';
          font-style: normal;
          font-weight: 400;
          src: local('SVN-Sofia Pro Regular'), local('SVN-Sofia Pro Regular'), url(${SVNSofiaProRegular}) format('woff2');
        }

        @font-face {
          font-family: 'SVN-Sofia Pro Medium';
          font-style: normal;
          font-weight: 400;
          src: local('SVN-Sofia Pro Medium'), local('SVN-Sofia Pro Medium'), url(${SVNSofiaProMedium}) format('woff2');
        }
      `,
    },
  };
};
