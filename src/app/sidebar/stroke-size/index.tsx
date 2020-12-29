import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import GridOnRounded from '@material-ui/icons/GridOnRounded';
import TabPanel, { TabPanelProps } from '../../../generic/tab-panel';
import IconTab, { IconTabProps } from '../../../generic/icon-tab';

const useStyles = makeStyles({
  test: {},
});

export const StrokeSizeTab: React.FC<IconTabProps> = (props) => (
  <IconTab icon={<GridOnRounded />} {...props} />
);

export const StrokeSizePanel: React.FC<Omit<TabPanelProps, 'title'>> = (
  props,
) => {
  const classes = useStyles();
  return (
    <TabPanel title="Stroke Size" {...props}>
      <Typography className={classes.test}>Size</Typography>
    </TabPanel>
  );
};
