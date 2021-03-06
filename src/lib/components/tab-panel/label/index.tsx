import React from 'react';
import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    marginRight: '2rem',
  },
});

interface Props {
  title: string;
}

export type TabPanelLabelProps = Props & BoxProps;

const TabPanelLabel: React.FC<Props & BoxProps> = ({
  className,
  title,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Typography className={classes.title} variant="subtitle1">
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default TabPanelLabel;
