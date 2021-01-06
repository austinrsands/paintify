import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel-title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';

const useStyles = makeStyles({
  content: {},
});

const ImageMaskingPanel: React.FC<Omit<TabPanelProps, 'title'>> = (props) => {
  const classes = useStyles();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Image Masking</TabPanelTitle>
      <TabPanelContent className={classes.content} />
    </TabPanel>
  );
};

export default ImageMaskingPanel;
