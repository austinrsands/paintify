import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import TabPanel, {
  TabPanelProps,
} from '../../../../../generic/components/tab-panel';
import IconTab, {
  IconTabProps,
} from '../../../../../generic/components/icon-tab';

const useStyles = makeStyles({
  test: {},
});

export const ImageUploadTab: React.FC<IconTabProps> = (props) => (
  <IconTab icon={<ImageRoundedIcon />} {...props} />
);

export const ImageUploadPanel: React.FC<Omit<TabPanelProps, 'title'>> = (
  props,
) => {
  const classes = useStyles();
  return (
    <TabPanel title="Image Upload" {...props}>
      <Typography className={classes.test}>Upload</Typography>
    </TabPanel>
  );
};
