import React, { useCallback, useMemo } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import Size from '../../../../../../../util/structures/size';
import StyleProps from '../../../../../../../util/structures/style-props';
import Brush from '../../../../../../../util/structures/brush';
import Vector from '../../../../../../../util/structures/vector';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { paintStroke } from '../../../../../../../util/drawing/stroke';
import { useAppContext } from '../../../../../../context';
import { randomColor } from '../../../../../../../util/math';

const PREVIEW_SIZE: Size = { width: 300, height: 200 };
const STROKE_LENGTH = 250;
const STROKE_ROTATION = 0;

const BrushStrokePreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  // Memoize brush
  const brush = useMemo(() => {
    const height = STROKE_LENGTH / state.strokeLength;
    const width = height * state.brushRoundness;
    return new Brush(
      { width, height },
      state.strokeTexture,
      state.brushDensity,
    );
  }, [
    state.brushDensity,
    state.brushRoundness,
    state.strokeLength,
    state.strokeTexture,
  ]);

  // Draw brush stroke
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      // Determine position of stroke
      const position: Vector = {
        x: context.canvas.width / 2,
        y: context.canvas.height / 2,
      };

      // Determine random color to paint
      const color = { ...randomColor(), alpha: state.strokeAlpha };

      context.fillStyle = 'white';
      fillBackground(context);
      paintStroke(
        context,
        brush,
        position,
        STROKE_ROTATION,
        color,
        STROKE_LENGTH,
        state.strokeTaper,
        state.strokeLift,
      );
    },
    [brush, state.strokeAlpha, state.strokeLift, state.strokeTaper],
  );

  return (
    <TabPanelPreview
      width={PREVIEW_SIZE.width}
      height={PREVIEW_SIZE.height}
      onSetup={setup}
      noLoop
      {...props}
    />
  );
};
export default BrushStrokePreview;
