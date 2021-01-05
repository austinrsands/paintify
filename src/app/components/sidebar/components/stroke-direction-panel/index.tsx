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
