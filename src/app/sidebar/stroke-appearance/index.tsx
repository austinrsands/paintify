import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import BrushRoundedIcon from '@material-ui/icons/BrushRounded';
import TabPanel, { TabPanelProps } from '../../../generic/tab-panel';
import IconTab, { IconTabProps } from '../../../generic/icon-tab';

const useStyles = makeStyles({
  test: {},
});

export const StrokeAppearanceTab: React.FC<IconTabProps> = (props) => (
  <IconTab icon={<BrushRoundedIcon />} {...props} />
);

export const StrokeAppearancePanel: React.FC<Omit<TabPanelProps, 'title'>> = (
  props,
) => {
  const classes = useStyles();
  return (
    <TabPanel title="Stroke Appearance" {...props}>
      <Typography className={classes.test}>Appearance</Typography>
    </TabPanel>
  );
};
