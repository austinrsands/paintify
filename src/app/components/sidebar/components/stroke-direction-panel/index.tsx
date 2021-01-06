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

const StrokeDirectionPanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Direction</TabPanelTitle>
      <TabPanelContent className={classes.content} />
    </TabPanel>
  );
};

export default StrokeDirectionPanel;
