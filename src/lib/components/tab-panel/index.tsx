import React from 'react';
import { makeStyles, Paper, PaperProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface Props {
  value?: any;
  index: number;
}

export type TabPanelProps = Props & PaperProps;

const TabPanel: React.FC<TabPanelProps> = ({
  value,
  index,
  children,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return value === index ? (
    <Paper
      className={clsx(classes.root, className)}
      square
      hidden={value !== index}
      {...rest}
    >
      {children}
    </Paper>
  ) : null;
};

export default TabPanel;
