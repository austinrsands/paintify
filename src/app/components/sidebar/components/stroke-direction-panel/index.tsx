import React from 'react';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import DirectionFieldPreview from './components/preview';

const StrokeDirectionPanel: React.FC<TabPanelProps> = (props) => (
  <TabPanel {...props}>
    <TabPanelTitle>Stroke Direction</TabPanelTitle>
    <TabPanelContent>
      <DirectionFieldPreview />
    </TabPanelContent>
  </TabPanel>
);

export default StrokeDirectionPanel;
