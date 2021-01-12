import React, { useMemo } from 'react';
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
import EdgeThresholdSlider from './components/edge-threshold-slider';
import { useAppContext } from '../../../../context';
import generateGridPoints from '../../../../../util/image-processing/grid-points';
import getEdgeDetails from '../../../../../util/image-processing/edge-details';
import getNoiseDirection from '../../../../../util/image-processing/noise-direction';
import { generateStrokeDirectionField } from '../../../../../util/image-processing/stroke-direction';
import Size from '../../../../../util/structures/size';

const useStyles = makeStyles({
  option: {
    width: '60%',
  },
});

const SAMPLES_PER_ROW = 25;

const StrokeDirectionPanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();

  // Determine points to sample
  const samplePoints = useMemo(() => {
    if (!state.imageData) return [];
    return generateGridPoints(state.imageData, SAMPLES_PER_ROW);
  }, [state.imageData]);

  // Memoize edge details
  const edgeInformation = useMemo(() => {
    if (!state.imageData) return [];
    // Needed for typescript to recognize definite value
    // eslint-disable-next-line prefer-destructuring
    const imageData = state.imageData;
    return samplePoints.map((point) => getEdgeDetails(imageData, point));
  }, [samplePoints, state.imageData]);

  // Memoize noise directions
  const noiseInformation = useMemo(
    () =>
      samplePoints.map((point) =>
        getNoiseDirection(
          point,
          state.noiseScale,
          state.noiseSeed,
          state.noiseCurl,
        ),
      ),
    [samplePoints, state.noiseCurl, state.noiseScale, state.noiseSeed],
  );

  // Memoize resulting direction field
  const directionField = useMemo(() => {
    if (!state.imageData) return null;
    const size: Size = {
      width: state.imageData.width,
      height: state.imageData.height,
    };
    return generateStrokeDirectionField(
      size,
      samplePoints,
      edgeInformation,
      noiseInformation,
      state.edgeThreshold,
    );
  }, [
    edgeInformation,
    noiseInformation,
    samplePoints,
    state.edgeThreshold,
    state.imageData,
  ]);

  return (
    <TabPanel {...props}>
      <TabPanelTitle>Stroke Direction</TabPanelTitle>
      <TabPanelContent>
        {directionField && (
          <DirectionFieldPreview directionField={directionField} />
        )}
        <TabPanelLabel title="Noise Seed">
          <NoiseSeedInput className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Noise Scale">
          <NoiseScaleSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Noise Curl">
          <NoiseCurlSlider className={classes.option} />
        </TabPanelLabel>
        <TabPanelLabel title="Threshold">
          <EdgeThresholdSlider className={classes.option} />
        </TabPanelLabel>
      </TabPanelContent>
    </TabPanel>
  );
};

export default StrokeDirectionPanel;
