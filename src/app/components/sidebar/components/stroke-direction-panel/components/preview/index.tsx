import React, { useCallback, useMemo } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { generateDirectionField } from '../../../../../../../util/image-processing/direction-field';
import { drawDirectionField } from '../../../../../../../util/drawing/direction-field';

const PREVIEW_WIDTH = 500;
const ARROWS_PER_LINE = 25;
const ARROW_LENGTH = 8;
const ARROW_BLADE_LENGTH = 2;

const DirectionFieldPreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  const directionField = useMemo(
    () =>
      state.imageData
        ? generateDirectionField(state.imageData, ARROWS_PER_LINE, 0.00003)
        : undefined,
    [state.imageData],
  );

  // Draw direction field
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (directionField) {
        context.fillStyle = 'white';
        fillBackground(context);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        drawDirectionField(
          context,
          directionField,
          ARROW_LENGTH,
          ARROW_BLADE_LENGTH,
        );
      }
    },
    [directionField],
  );

  return state.imageData ? (
    <TabPanelPreview
      width={PREVIEW_WIDTH}
      height={PREVIEW_WIDTH * (state.imageData.height / state.imageData.width)}
      onSetup={setup}
      noLoop
      {...props}
    />
  ) : null;
};
export default DirectionFieldPreview;
