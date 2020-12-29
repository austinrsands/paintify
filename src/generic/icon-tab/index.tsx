import React from 'react';
import { makeStyles, Tab, TabProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    minWidth: '3rem',
    minHeight: '3rem',
    padding: '1.3rem',
  },
});

export type IconTabProps = TabProps;

const IconTab: React.FC<IconTabProps> = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Tab className={clsx(classes.root, className)} disableRipple {...props} />
  );
};

export default IconTab;
