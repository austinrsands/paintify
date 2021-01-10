import React from 'react';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import MaskingPreview from './components/preview';

const ImageMaskingPanel: React.FC<Omit<TabPanelProps, 'title'>> = (props) => (
  <TabPanel {...props}>
    <TabPanelTitle>Image Masking</TabPanelTitle>
    <TabPanelContent>
      <MaskingPreview />
    </TabPanelContent>
  </TabPanel>
);

export default ImageMaskingPanel;
