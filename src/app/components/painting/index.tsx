import React, { useCallback, useEffect, useState } from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../lib/components/canvas';
import Size from '../../../util/structures/size';
import { useAppContext } from '../../context';
import { scaleToFit } from '../../../util/math';
import Rect from '../../../util/structures/rect';
import Vector from '../../../util/structures/vector';
import {
  clearBackground,
  fillBackground,
} from '../../../util/drawing/background';
import { paintStroke } from '../../../util/drawing/stroke';
import Brush from '../../../util/structures/brush';

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
  const { state, dispatch } = useAppContext();
  const [canvasRect, setCanvasRect] = useState<Rect>();

  // Create the painting context
  useEffect(() => {
    if (!state.imageData) return;

    // Create offscreen canvas
    const canvas = new OffscreenCanvas(
      state.imageData.width,
      state.imageData.height,
    );

    // Get drawing context
    const context = canvas.getContext('2d');

    if (!context) return;

    // Paint background of canvas white
    context.fillStyle = 'white';
    fillBackground(context);

    // Update the painting context
    if (context) dispatch({ type: 'update-painting-context', context });
  }, [dispatch, state.imageData]);

  // Determine space where painting is shown
  const setup = useCallback(() => {
    if (!state.paintingContext) return;

    // Determine the size of the painting
    const paintingSize: Size = {
      width: state.paintingContext.canvas.width,
      height: state.paintingContext.canvas.height,
    };

    // Determine the maximum allowed size of the canvas
    const maxCanvasSize: Size = {
      width: size.width / 1.5,
      height: size.height / 1.3,
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
  }, [size.height, size.width, state.paintingContext]);

  // Draw the painting on the canvas
  const draw = useCallback(
    (context: CanvasRenderingContext2D, deltaTime: number) => {
      if (!(canvasRect && state.paintingContext)) return;

      // Paint a stroke on the painting
      if (state.isPainting)
        paintStroke(
          state.paintingContext,
          new Brush({ width: 30, height: 60 }, 0.2, 0.7),
          {
            x: Math.random() * state.paintingContext.canvas.width,
            y: Math.random() * state.paintingContext.canvas.height,
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
        state.paintingContext.canvas,
        canvasRect.position.x,
        canvasRect.position.y,
        canvasRect.size.width,
        canvasRect.size.height,
      );
    },
    [canvasRect, state.isPainting, state.paintingContext],
  );

  return (
    <Portal container={canvasRoot}>
      <Canvas
        width={size.width}
        height={size.height}
        onSetup={setup}
        onDraw={draw}
        targetFramerate={60}
        {...rest}
      />
    </Portal>
  );
};

export default Painting;
