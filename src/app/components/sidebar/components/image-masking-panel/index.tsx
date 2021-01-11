import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';
import MaskingPreview from './components/preview';
import TabPanelLabel from '../../../../../lib/components/tab-panel/label';
import BrightnessThresholdSlider from './components/brightness-threshold-slider';
import { useAppContext } from '../../../../context';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const ImageMaskingPanel: React.FC<Omit<TabPanelProps, 'title'>> = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();

  // Memoize brigthness values
  const brightnesses = useMemo(() => {
    const values: number[] = [];
    if (!state.imageData) return values;
    for (let i = 0; i < state.imageData.data.length; i += 4) {
      const brightness =
        (state.imageData.data[i] +
          state.imageData.data[i + 1] +
          state.imageData.data[i + 2]) /
        3;
      values.push(brightness);
    }
    return values;
  }, [state.imageData]);

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Image Masking</TabPanelTitle>
      <TabPanelContent>
        <MaskingPreview brightnesses={brightnesses} />
        <TabPanelLabel title="Threshold">
          <BrightnessThresholdSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default ImageMaskingPanel;
