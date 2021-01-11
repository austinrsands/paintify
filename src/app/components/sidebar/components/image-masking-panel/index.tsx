import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import MaskingPreview from './components/preview';
import TabPanelLabel from '../../../../../lib/components/tab-panel/label';
import BrightnessThresholdSlider from './components/brightness-threshold-slider';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const ImageMaskingPanel: React.FC<Omit<TabPanelProps, 'title'>> = (props) => {
  const classes = useStyles();

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Image Masking</TabPanelTitle>
      <TabPanelContent>
        <MaskingPreview />
        <TabPanelLabel title="Threshold">
          <BrightnessThresholdSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default ImageMaskingPanel;
