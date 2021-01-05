import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../generic/components/tab-panel';
import TabPanelTitle from '../../../../../generic/components/tab-panel-title';
import TabPanelContent from '../../../../../generic/components/tab-panel-content';
import { useAppContext } from '../../../../context';
import generateQuadTree from '../../../../util/image-processing';
import QuadTreePreview from './components/preview';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    width: '100%',
    height: 'auto',
    margin: '0.5rem 0 2rem 0',
    alignSelf: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
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
        <QuadTreePreview className={classes.preview} />
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeSizePanel;
