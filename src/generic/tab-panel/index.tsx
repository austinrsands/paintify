import { Box, BoxProps, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: '15rem',
    padding: '1rem',
  },
  title: {
    paddingBottom: '1rem',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface Props {
  value?: any;
  index: number;
  title: string;
}

export type TabPanelProps = Props & BoxProps;

const TabPanel: React.FC<TabPanelProps> = ({
  value,
  index,
  title,
  children,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.root, className)}
      hidden={value !== index}
      {...rest}
    >
      {value === index && (
        <Box className={classes.content}>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
