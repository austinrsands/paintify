import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import WavesRounded from '@material-ui/icons/WavesRounded';
import TabPanel, { TabPanelProps } from '../../../generic/tab-panel';
import IconTab, { IconTabProps } from '../../../generic/icon-tab';

const useStyles = makeStyles({
  test: {},
});

export const StrokeDirectionTab: React.FC<IconTabProps> = (props) => (
  <IconTab icon={<WavesRounded />} {...props} />
);

export const StrokeDirectionPanel: React.FC<Omit<TabPanelProps, 'title'>> = (
  props,
) => {
  const classes = useStyles();
  return (
    <TabPanel title="Stroke Direction" {...props}>
      <Typography className={classes.test}>Direction</Typography>
    </TabPanel>
  );
};
