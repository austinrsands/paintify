import React, { useCallback } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import Size from '../../../../../../../util/structures/size';
import StyleProps from '../../../../../../../util/structures/style-props';
import Brush from '../../../../../../../util/structures/brush';
import Vector from '../../../../../../../util/structures/vector';
import Color from '../../../../../../../util/structures/color';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { paintStroke } from '../../../../../../../util/drawing/stroke';

const PREVIEW_SIZE: Size = { width: 300, height: 200 };
const BRUSH = new Brush({ width: 30, height: 60 }, 0.2, 0.7);

const BrushStrokePreview: React.FC<StyleProps> = (props) => {
  // Draw brush stroke
  const setup = useCallback((context: CanvasRenderingContext2D) => {
    const position: Vector = {
      x: context.canvas.width / 2,
      y: context.canvas.height / 2,
    };
    const rotation = 0;
    const baseColor: Color = { red: 50, green: 168, blue: 82, alpha: 0.3 };
    const length = 250;
    const taper = 0.1;
    const lift = 1;
    const segmentLength = 25;
    context.fillStyle = 'white';
    fillBackground(context);
    paintStroke(
      context,
      BRUSH,
      position,
      rotation,
      baseColor,
      length,
      taper,
      lift,
      segmentLength,
    );
  }, []);

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
