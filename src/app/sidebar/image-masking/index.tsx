import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { CompareRounded } from '@material-ui/icons';
import TabPanel, { TabPanelProps } from '../../../generic/tab-panel';
import IconTab, { IconTabProps } from '../../../generic/icon-tab';

const useStyles = makeStyles({
  test: {},
});

export const ImageMaskingTab: React.FC<IconTabProps> = (props) => (
  <IconTab icon={<CompareRounded />} {...props} />
);

export const ImageMaskingPanel: React.FC<Omit<TabPanelProps, 'title'>> = (
  props,
) => {
  const classes = useStyles();
  return (
    <TabPanel title="Image Masking" {...props}>
      <Typography className={classes.test}>Masking</Typography>
    </TabPanel>
  );
};
