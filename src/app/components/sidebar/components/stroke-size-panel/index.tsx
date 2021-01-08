import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import { useAppContext } from '../../../../context';
import QuadTreePreview from './components/preview';
import { generateQuadTree } from '../../../../../util/image-processing/quad-tree';

const useStyles = makeStyles((theme) => ({
  content: {},
}));

const StrokeSizePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useAppContext();

  // Generate and store quad tree
  useEffect(() => {
    if (state.imageData)
      dispatch({
        type: 'update-quad-tree',
        tree: generateQuadTree(state.imageData),
      });
  }, [dispatch, state.imageData]);

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Size</TabPanelTitle>
      <TabPanelContent className={classes.content}>
        <QuadTreePreview />
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeSizePanel;
