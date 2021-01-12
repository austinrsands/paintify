import React, { useCallback, useEffect, useState } from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../lib/components/canvas';
import Size from '../../../util/structures/size';
import { useAppContext } from '../../context';
import { getScaleToFit, isInRange } from '../../../util/math';
import Rect from '../../../util/structures/rect';
import Vector from '../../../util/structures/vector';
import {
  clearBackground,
  fillBackground,
} from '../../../util/drawing/background';
import { paintStroke } from '../../../util/drawing/stroke';
import Brush from '../../../util/structures/brush';
import {
  getPixelBrightness,
  getPixelColor,
} from '../../../util/image-processing/pixels';
import getStrokeDirection from '../../../util/image-processing/stroke-direction';
import getEdgeDetails from '../../../util/image-processing/edge-details';
import getNoiseDirection from '../../../util/image-processing/noise-direction';

const canvasRoot = document.getElementById('canvas-root');

const MAX_SEARCH_ATTEMPTS = 500;
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

  // Holds various sizes of the current brush style
  const [brushes, setBrushes] = useState<Map<number, Brush>>(new Map());

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

  // Returns a position for the stroke if possible
  const lookForStrokePosition = useCallback(() => {
    if (!state.paintingContext || !state.imageData) return null;
    let searchAttempts = 0;
    while (searchAttempts < MAX_SEARCH_ATTEMPTS) {
      // Pick random position
      const strokePosition: Vector = {
        x: Math.floor(Math.random() * state.paintingContext.canvas.width),
        y: Math.floor(Math.random() * state.paintingContext.canvas.height),
      };

      const brightness = getPixelBrightness(state.imageData, strokePosition);

      // Return position if it is in brightness range
      if (isInRange(brightness, state.brightnessRange)) return strokePosition;

      searchAttempts += 1;
    }
    return null;
  }, [state.brightnessRange, state.imageData, state.paintingContext]);

  // Clear the brushes when brush style changes
  useEffect(() => {
    if (
      state.brushRoundness ||
      state.strokeTexture ||
      state.brushDensity ||
      state.strokeLengthRatio
    )
      setBrushes(new Map());
  }, [
    state.brushDensity,
    state.brushRoundness,
    state.strokeLengthRatio,
    state.strokeTexture,
  ]);

  // Returns a brush to paint with
  const getBrush = useCallback(
    (strokeLength: number) => {
      // Determine brush height to use it as a key
      const brushHeight = strokeLength / state.strokeLengthRatio;

      // Use integer key to avoid floating point errors
      const brushKey = Math.floor(brushHeight);

      // If brush is saved, return it
      const savedBrush = brushes.get(brushKey);
      if (savedBrush) return savedBrush;

      // Create a new brush
      const brushWidth = brushHeight * state.brushRoundness;
      const newBrush = new Brush(
        { width: brushWidth, height: brushHeight },
        state.strokeTexture,
        state.brushDensity,
      );

      // Save the brush
      setBrushes((prev) => prev.set(brushKey, newBrush));

      // Return the brush
      return newBrush;
    },
    [
      brushes,
      state.brushDensity,
      state.brushRoundness,
      state.strokeLengthRatio,
      state.strokeTexture,
    ],
  );

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

    const strokePosition = lookForStrokePosition();

    // Return if no position was found
    if (!strokePosition) return;

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

    // Return if point is not contained in quad tree (should never happen though)
    if (!strokeLength) return;

    // Determine brush to use
    const brush = getBrush(strokeLength);

    paintStroke(
      state.paintingContext,
      brush,
      strokePosition,
      strokeDirection,
      paintColor,
      strokeLength,
      state.strokeTaper,
      state.strokeLift,
    );
  }, [
    getBrush,
    lookForStrokePosition,
    state.edgeThreshold,
    state.imageData,
    state.noiseCurl,
    state.noiseScale,
    state.noiseSeed,
    state.paintingContext,
    state.quadTree,
    state.strokeAlpha,
    state.strokeLift,
    state.strokeTaper,
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
