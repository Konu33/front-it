import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#D1C4E9',
      main: '#673AB7',
      dark: '#512DA8',
      contrastText: '#FFFFFF',
    },
  },
});

export default lightTheme;
