import React from 'react';
import {
  Backdrop,
  BackdropProps,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

// Returns whether browser supports newer features needed by this app
const browserIsSupported: boolean =
  (createImageBitmap && OffscreenCanvas) !== undefined;

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  icon: {
    fontSize: '8rem',
    color: theme.palette.warning.light,
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  subtitle: {
    textAlign: 'center',
  },
}));

const BrowserSupportBackdrop: React.FC<Omit<BackdropProps, 'open'>> = (
  props,
) => {
  const classes = useStyles();

  return (
    <Backdrop open={!browserIsSupported} {...props}>
      <Box className={classes.content}>
        <WarningRoundedIcon className={classes.icon} />
        <Typography className={classes.header} variant="h2">
          Browser not supported
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
          color="textSecondary"
        >
          Use Chrome, Opera, or Edge on your desktop for the best experience
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default BrowserSupportBackdrop;
