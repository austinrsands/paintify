import React, { useCallback } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';
import { isInRange } from '../../../../../../../util/math';

interface Props {
  brightnesses: number[];
}

const MaskingPreview: React.FC<Props & StyleProps> = ({
  brightnesses,
  ...rest
}) => {
  const { state } = useAppContext();

  // Draw masking image
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!state.imageData) return;

      // Get pixel data from image
      const data = state.imageData.data.slice(0);

      // Filter brightnesses
      brightnesses.forEach((brightness, index) => {
        const pixelIsIsAllowed = isInRange(brightness, state.brightnessRange);
        const channelValue = pixelIsIsAllowed ? 0 : 255;
        const pixelIndex = 4 * index;
        data.fill(channelValue, pixelIndex, pixelIndex + 3);
      });

      // Draw the masking image
      const maskingImageData = new ImageData(
        data,
        state.imageData.width,
        state.imageData.height,
      );
      context.putImageData(maskingImageData, 0, 0);
    },
    [brightnesses, state.brightnessRange, state.imageData],
  );

  return state.imageData ? (
    <TabPanelPreview
      width={state.imageData.width}
      height={state.imageData.height}
      onSetup={setup}
      noLoop
      {...rest}
    />
  ) : null;
};
export default MaskingPreview;
