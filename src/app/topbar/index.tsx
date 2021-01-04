import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import GithubButton from './github-button';
import PlayPauseButton from './play-pause-button';
import ReplayButton from './replay-button';
import SaveButton from './save-button';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem 1rem',
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 1rem',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1,
  },
  centerButton: {
    margin: '0 2rem',
  },
});

const Topbar: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.left} />
      <Box className={classes.center}>
        <PlayPauseButton className={classes.centerButton} />
        <ReplayButton className={classes.centerButton} />
        <SaveButton className={classes.centerButton} />
      </Box>
      <Box className={classes.right}>
        <GithubButton />
      </Box>
    </Box>
  );
};

export default Topbar;
