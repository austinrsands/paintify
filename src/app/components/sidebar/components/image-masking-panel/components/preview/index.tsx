import React, { useCallback } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';
import { isInRange } from '../../../../../../../util/math';

const MaskingPreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  // Draw masking image
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!state.imageData) return;

      // Get pixel data from image
      const data = state.imageData.data.slice(0);

      // Change brightnesses
      for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const pixelIsIsAllowed = isInRange(brightness, state.brightnessRange);
        const channelValue = pixelIsIsAllowed ? 0 : 255;
        data[i] = channelValue;
        data[i + 1] = channelValue;
        data[i + 2] = channelValue;
      }

      // Draw the masking image
      const maskingImageData = new ImageData(
        data,
        state.imageData.width,
        state.imageData.height,
      );
      context.putImageData(maskingImageData, 0, 0);
    },
    [state.brightnessRange, state.imageData],
  );

  return state.imageData ? (
    <TabPanelPreview
      width={state.imageData.width}
      height={state.imageData.height}
      onSetup={setup}
      noLoop
      {...props}
    />
  ) : null;
};
export default MaskingPreview;
