import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import BrushStrokePreview from './components/preview';
import TabPanelLabel from '../../../../../lib/components/tab-panel/label';
import BrushRoundnessSlider from './components/brush-roundness-slider';
import StrokeTextureSlider from './components/stroke-texture-slider';
import BrushDensitySlider from './components/brush-density-slider';
import StrokeLengthSlider from './components/stroke-length-slider';
import StrokeTaperSlider from './components/stroke-taper-slider';
import StrokeLiftSlider from './components/stroke-lift-slider';
import StrokeAlphaSlider from './components/stroke-alpha-slider';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const StrokeStylePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Style</TabPanelTitle>
      <TabPanelContent>
        <BrushStrokePreview />
        <TabPanelLabel title="Roundness">
          <BrushRoundnessSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Texture">
          <StrokeTextureSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Alpha">
          <StrokeAlphaSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Density">
          <BrushDensitySlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Length">
          <StrokeLengthSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Taper">
          <StrokeTaperSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Lift">
          <StrokeLiftSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeStylePanel;
