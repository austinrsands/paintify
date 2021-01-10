import React, { useCallback, useMemo, useState } from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../lib/components/canvas';
import Size from '../../../lib/structures/size';
import { useAppContext } from '../../context';
import { scaleToFit } from '../../../util/math';
import Rect from '../../../lib/structures/rect';
import Vector from '../../../lib/structures/vector';
import {
  clearBackground,
  fillBackground,
} from '../../../util/drawing/background';
import { paintStroke } from '../../../util/drawing/stroke';
import Brush from '../../../lib/structures/brush';

const canvasRoot = document.getElementById('canvas-root');

interface Props {
  size: Size;
}

type PaintingProps = Props &
  Omit<
    CanvasProps,
    | 'width'
    | 'height'
    | 'onSetup'
    | 'onDraw'
    | 'onPredraw'
    | 'onPostdraw'
    | 'targetFramerate'
  >;

const Painting: React.FC<PaintingProps> = ({ size, ...rest }) => {
  const { state } = useAppContext();
  const [canvasRect, setCanvasRect] = useState<Rect>();

  /**
   * The canvas context where the brush strokes are painted
   */
  const fullSizePaintingContext = useMemo(() => {
    if (!state.imageData) return null;

    // Create offscreen canvas
    const canvas = new OffscreenCanvas(
      state.imageData.width,
      state.imageData.height,
    );

    // Get drawing context
    const context = canvas.getContext('2d');

    if (!context) return null;

    // Paint background of canvas white
    context.fillStyle = 'white';
    fillBackground(context);

    return context;
  }, [state.imageData]);

  // Determine space where painting is shown
  const setup = useCallback(() => {
    if (!fullSizePaintingContext) return;

    // Determine the size of the painting
    const paintingSize: Size = {
      width: fullSizePaintingContext.canvas.width,
      height: fullSizePaintingContext.canvas.height,
    };

    // Determine the maximum allowed size of the canvas
    const maxCanvasSize: Size = {
      width: size.width / 2,
      height: size.height / 2,
    };

    // Determine the amount needed to scale the painting
    const canvasScale = scaleToFit(paintingSize, maxCanvasSize);

    // Determine the size of the canvas
    const canvasSize: Size = {
      width: paintingSize.width * canvasScale,
      height: paintingSize.height * canvasScale,
    };

    // Determine the position of the canvas
    const canvasPosition: Vector = {
      x: (size.width - canvasSize.width) / 2,
      y: (size.height - canvasSize.height) / 2,
    };

    // Update painting rect
    setCanvasRect({ size: canvasSize, position: canvasPosition });
  }, [fullSizePaintingContext, size.height, size.width]);

  // Draw the painting on the canvas
  const draw = useCallback(
    (context: CanvasRenderingContext2D, deltaTime: number) => {
      if (!(canvasRect && fullSizePaintingContext)) return;

      // Paint a stroke on the painting
      if (state.isPainting)
        paintStroke(
          fullSizePaintingContext,
          new Brush({ width: 30, height: 60 }, 0.2, 0.7),
          {
            x: Math.random() * fullSizePaintingContext.canvas.width,
            y: Math.random() * fullSizePaintingContext.canvas.height,
          },
          Math.random() * 2 * Math.PI,
          { red: 50, green: 168, blue: 82, alpha: 0.3 },
          250,
          0.1,
          1,
          25,
        );

      // Show painting on canvas
      clearBackground(context);
      context.drawImage(
        fullSizePaintingContext.canvas,
        canvasRect.position.x,
        canvasRect.position.y,
        canvasRect.size.width,
        canvasRect.size.height,
      );
    },
    [canvasRect, fullSizePaintingContext, state.isPainting],
  );

  return (
    <Portal container={canvasRoot}>
      <Canvas
        width={size.width}
        height={size.height}
        onSetup={setup}
        onDraw={draw}
        targetFramerate={2}
        {...rest}
      />
    </Portal>
  );
};

export default Painting;
