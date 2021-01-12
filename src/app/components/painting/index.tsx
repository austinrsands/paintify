import React, { useCallback, useEffect, useState } from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../lib/components/canvas';
import Size from '../../../util/structures/size';
import { useAppContext } from '../../context';
import { getScaleToFit } from '../../../util/math';
import Rect from '../../../util/structures/rect';
import Vector from '../../../util/structures/vector';
import {
  clearBackground,
  fillBackground,
} from '../../../util/drawing/background';
import { paintStroke } from '../../../util/drawing/stroke';
import Brush from '../../../util/structures/brush';
import { getPixelColor } from '../../../util/image-processing/pixels';
import getStrokeDirection from '../../../util/image-processing/stroke-direction';
import getEdgeDetails from '../../../util/image-processing/edge-details';
import getNoiseDirection from '../../../util/image-processing/noise-direction';

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
    const canvasScale = getScaleToFit(paintingSize, maxCanvasSize);

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

  // Draws painting onto canvas
  const updateCanvas = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (!state.paintingContext || !canvasRect) return;
      clearBackground(context);
      context.drawImage(
        state.paintingContext.canvas,
        canvasRect.position.x,
        canvasRect.position.y,
        canvasRect.size.width,
        canvasRect.size.height,
      );
    },
    [canvasRect, state.paintingContext],
  );

  // Paints strokes onto painting
  const paint = useCallback(() => {
    if (!state.paintingContext || !state.imageData || !state.quadTree) return;

    const strokePosition: Vector = {
      x: Math.floor(Math.random() * state.paintingContext.canvas.width),
      y: Math.floor(Math.random() * state.paintingContext.canvas.height),
    };

    const paintColor = {
      ...getPixelColor(state.imageData, strokePosition),
      alpha: state.strokeAlpha,
    };

    const edgeDetails = getEdgeDetails(state.imageData, strokePosition);

    const noiseDirection = getNoiseDirection(
      strokePosition,
      state.noiseScale,
      state.noiseSeed,
      state.noiseCurl,
    );
    const strokeDirection = getStrokeDirection(
      edgeDetails.direction,
      noiseDirection,
      edgeDetails.strength,
      state.edgeThreshold,
    );

    const strokeLength = state.quadTree.smallestBoundingSubtree(strokePosition)
      ?.diagonal;
    if (!strokeLength) return;

    const brushHeight = strokeLength / state.strokeLengthRatio;
    const brushWidth = brushHeight * state.brushRoundness;

    paintStroke(
      state.paintingContext,
      new Brush(
        { width: brushWidth, height: brushHeight },
        state.strokeTexture,
        state.brushDensity,
      ),
      strokePosition,
      strokeDirection,
      paintColor,
      strokeLength,
      state.strokeTaper,
      state.strokeLift,
    );
  }, [
    state.brushDensity,
    state.brushRoundness,
    state.edgeThreshold,
    state.imageData,
    state.noiseCurl,
    state.noiseScale,
    state.noiseSeed,
    state.paintingContext,
    state.quadTree,
    state.strokeAlpha,
    state.strokeLengthRatio,
    state.strokeLift,
    state.strokeTaper,
    state.strokeTexture,
  ]);

  // Draw the painting on the canvas
  const draw = useCallback(
    (context: CanvasRenderingContext2D, deltaTime: number) => {
      if (state.isPainting) paint();
      updateCanvas(context);
    },
    [paint, state.isPainting, updateCanvas],
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
