import React from 'react';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Painting from './components/painting';
import useWindowSize from '../lib/hooks/use-window-size';
import AppContextProvider from './context/provider';

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed',
    width: '30rem',
    height: '100vh',
  },
  topbar: {
    position: 'fixed',
    width: '100vw',
  },
  painting: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    zIndex: -1,
  },
});

const App: React.FC = () => {
  const windowSize = useWindowSize(1);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <Topbar className={classes.topbar} />
        <Sidebar className={classes.sidebar} />
        <Painting className={classes.painting} size={windowSize} />
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;
