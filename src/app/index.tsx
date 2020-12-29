import React from 'react';
import { Box, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { darkTheme } from './theme';
import Sidebar from './sidebar';
import Topbar from './topbar';
import Painting from './painting';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'stretch',
  },
  sidebar: {},
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  painting: {
    flex: 1,
  },
  topbar: {},
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Sidebar className={classes.sidebar} />
        <Box className={classes.content}>
          <Topbar className={classes.topbar} />
          <Painting className={classes.painting} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
