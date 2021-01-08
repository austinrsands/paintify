import React from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import Size from '../../../../../../../lib/structures/size';
import StyleProps from '../../../../../../../lib/structures/style-props';
import Brush from '../../../../../../../lib/structures/brush';
import Vector2 from '../../../../../../../lib/structures/vector2';
import Color from '../../../../../../../lib/structures/color';
import StrokeOptions from '../../../../../../../lib/structures/stroke-options';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { paintStroke } from '../../../../../../../util/drawing/stroke';

const PREVIEW_SIZE: Size = { width: 300, height: 200 };
const BRUSH = new Brush({ width: 30, height: 60 }, 0.7, 0.2);

const BrushStrokePreview: React.FC<StyleProps> = (props) => {
  // Draw brush stroke
  const setup = (context: CanvasRenderingContext2D) => {
    const position: Vector2 = {
      x: context.canvas.width / 2,
      y: context.canvas.height / 2,
    };
    const baseColor: Color = { red: 50, green: 168, blue: 82, alpha: 0.3 };
    const length = 250;
    const taper = 0.1;
    const lift = 1;
    const segmentLength = 25;
    const options: StrokeOptions = {
      baseColor,
      length,
      taper,
      lift,
      segmentLength,
    };
    context.fillStyle = 'white';
    fillBackground(context);
    paintStroke(context, BRUSH, options, position);
  };

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
