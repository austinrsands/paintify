import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    padding: '0 2rem',
    flex: 1,
    overflowY: 'auto',
  },
});

export type TabPanelContentProps = BoxProps;

const TabPanelContent: React.FC<TabPanelContentProps> = ({
  className,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      {children}
    </Box>
  );
};

export default TabPanelContent;
