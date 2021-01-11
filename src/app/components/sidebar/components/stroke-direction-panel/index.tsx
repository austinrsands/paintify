import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import DirectionFieldPreview from './components/preview';
import NoiseScaleSlider from './components/noise-scale-slider';
import TabPanelLabel from '../../../../../lib/components/tab-panel/label';
import NoiseSeedInput from './components/noise-seed-input';
import NoiseCurlSlider from './components/noise-curl-slider';
import EdgeCutoffSlider from './components/edge-cutoff-slider';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const StrokeDirectionPanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Direction</TabPanelTitle>
      <TabPanelContent>
        <DirectionFieldPreview />
        <TabPanelLabel title="Noise Seed">
          <NoiseSeedInput className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Noise Scale">
          <NoiseScaleSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Noise Curl">
          <NoiseCurlSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Edge Cutoff">
          <EdgeCutoffSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeDirectionPanel;
