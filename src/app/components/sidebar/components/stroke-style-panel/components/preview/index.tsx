import React from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { fillBackground, paintStroke } from '../../../../../../util/drawing';
import Size from '../../../../../../../lib/structures/size';
import StyleProps from '../../../../../../../lib/structures/style-props';
import Brush from '../../../../../../../lib/structures/brush';

const PREVIEW_SIZE: Size = { width: 1000, height: 1000 };

const BrushStrokePreview: React.FC<StyleProps> = (props) => {
  // Draw brush stroke
  const setup = (context: CanvasRenderingContext2D) => {
    const brush = new Brush({ width: 50, height: 100 }, 0.05, 0.2);
    fillBackground(context);
    paintStroke(
      context,
      brush,
      {
        x: context.canvas.width / 2,
        y: context.canvas.height / 2,
      },
      { red: 0, green: 255, blue: 0 },
      300,
      Math.PI / 4,
    );
  };

  return (
    <TabPanelPreview
      width={PREVIEW_SIZE.width}
      height={PREVIEW_SIZE.height}
      onSetup={setup}
      {...props}
    />
  );
};
export default BrushStrokePreview;
