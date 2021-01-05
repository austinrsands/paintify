import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../generic/components/tab-panel';
import TabPanelTitle from '../../../../../generic/components/tab-panel-title';
import TabPanelContent from '../../../../../generic/components/tab-panel-content';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
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
