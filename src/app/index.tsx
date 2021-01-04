import React from 'react';
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Painting from './painting';
import useWindowSize from '../generic/use-window-size';

const useStyles = makeStyles({
  sidebar: {
    position: 'fixed',
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
  const windowSize = useWindowSize(0);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar className={classes.topbar} />
      <Sidebar className={classes.sidebar} />
      <Painting className={classes.painting} size={windowSize} />
    </ThemeProvider>
  );
};

export default App;
