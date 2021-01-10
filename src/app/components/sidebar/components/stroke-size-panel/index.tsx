import React, { useEffect } from 'react';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import { useAppContext } from '../../../../context';
import QuadTreePreview from './components/preview';
import { generateQuadTree } from '../../../../../util/image-processing/quad-tree';

const SAMPLING_DENSITY = 0.001;
const SUBDIVISION_THRESHOLD = 10;

const StrokeSizePanel: React.FC<TabPanelProps> = (props) => {
  const { state, dispatch } = useAppContext();

  // Generate and store quad tree
  useEffect(() => {
    if (state.imageData)
      dispatch({
        type: 'update-quad-tree',
        tree: generateQuadTree(
          state.imageData,
          SAMPLING_DENSITY,
          SUBDIVISION_THRESHOLD,
        ),
      });
  }, [dispatch, state.imageData]);

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Size</TabPanelTitle>
      <TabPanelContent>
        <QuadTreePreview />
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeSizePanel;
