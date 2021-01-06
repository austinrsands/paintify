import React from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { fillBackground, paintStroke } from '../../../../../../../util/drawing';
import Size from '../../../../../../../lib/structures/size';
import StyleProps from '../../../../../../../lib/structures/style-props';
import Brush from '../../../../../../../lib/structures/brush';

const PREVIEW_SIZE: Size = { width: 300, height: 200 };
const BRUSH = new Brush({ width: 30, height: 60 }, 0.8, 0.1);

const BrushStrokePreview: React.FC<StyleProps> = (props) => {
  // Draw brush stroke
  const setup = (context: CanvasRenderingContext2D) => {
    fillBackground(context);
    paintStroke(
      context,
      BRUSH,
      {
        x: context.canvas.width / 2,
        y: context.canvas.height / 2,
      },
      { red: 0, green: 0, blue: 0 },
      250,
      0.3,
      1,
    );
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
