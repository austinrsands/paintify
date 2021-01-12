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
import { pixelColor } from '../../../util/image-processing/pixels';

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
      if (
        !(
          state.imageData &&
          state.quadTree &&
          canvasRect &&
          state.paintingContext
        )
      )
        return;

      // Paint a stroke on the painting
      if (state.isPainting) {
        const position: Vector = {
          x: Math.floor(Math.random() * state.paintingContext.canvas.width),
          y: Math.floor(Math.random() * state.paintingContext.canvas.height),
        };

        const direction = Math.random() * 2 * Math.PI;

        const color = {
          ...pixelColor(state.imageData, position),
          alpha: state.strokeAlpha,
        };

        const length = state.quadTree.smallestBoundingSubtree(position)?.rect
          .size.width;

        if (!length) return;

        paintStroke(
          state.paintingContext,
          new Brush(
            { width: 30, height: 60 },
            state.strokeTexture,
            state.brushDensity,
          ),
          position,
          direction,
          color,
          length,
          state.strokeTaper,
          state.strokeLift,
        );
      }

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
    [
      canvasRect,
      state.brushDensity,
      state.imageData,
      state.isPainting,
      state.paintingContext,
      state.quadTree,
      state.strokeAlpha,
      state.strokeLift,
      state.strokeTaper,
      state.strokeTexture,
    ],
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
