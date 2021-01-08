import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import BrushStrokePreview from './components/preview';

const useStyles = makeStyles({
  content: {},
});

const StrokeStylePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Style</TabPanelTitle>
      <TabPanelContent className={classes.content}>
        <BrushStrokePreview />
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeStylePanel;
