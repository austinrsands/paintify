import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
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
  group: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Topbar: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.left}>Left</Box>
      <Box className={classes.center}>Center</Box>
      <Box className={classes.right}>Right</Box>
    </Box>
  );
};

export default Topbar;
