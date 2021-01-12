import React from 'react';
import { makeStyles, Typography, TypographyProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    padding: '1rem 1.5rem',
    fontWeight: 'bold',
  },
});

export type TabPanelTitleProps = TypographyProps;

const TabPanelTitle: React.FC<TabPanelTitleProps> = ({
  className,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Typography
      className={clsx(classes.root, className)}
      variant="h5"
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default TabPanelTitle;
