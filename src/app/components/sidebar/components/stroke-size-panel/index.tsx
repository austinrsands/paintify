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
import TabPanelLabel from '../../../../../lib/components/tab-panel/label';
import SamplingDensitySlider from './components/sampling-density-slider';
import SubdivisionThresholdSlider from './components/subdivision-threshold-slider';
import SizeRangeSlider from './components/size-range-slider';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const StrokeSizePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state, dispatch } = useAppContext();

  // Generate and store quad tree
  useEffect(() => {
    if (state.imageData)
      dispatch({
        type: 'update-quad-tree',
        tree: generateQuadTree(
          state.imageData,
          state.quadTreeSamplingDensity,
          state.quadTreeSubdivisionThreshold,
          state.quadTreeSizeRange,
        ),
      });
  }, [
    dispatch,
    state.imageData,
    state.quadTreeSamplingDensity,
    state.quadTreeSizeRange,
    state.quadTreeSubdivisionThreshold,
  ]);

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Size</TabPanelTitle>
      <TabPanelContent>
        <QuadTreePreview />
        <TabPanelLabel title="Samples">
          <SamplingDensitySlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Resistance">
          <SubdivisionThresholdSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Size">
          <SizeRangeSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeSizePanel;
