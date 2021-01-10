import React from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../lib/components/canvas';
import Size from '../../../lib/structures/size';
import { useAppContext } from '../../context';
import { scaleToFit } from '../../../util/math';

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
  const setup = (context: CanvasRenderingContext2D) => {
    // ...
  };

  const draw = (context: CanvasRenderingContext2D, deltaTime: number) => {
    // Abort if painting isn't possible
    if (!state.imageData) return;

    // Determine the size of the image
    const sourcePaintingSize: Size = {
      width: state.imageData.width,
      height: state.imageData.height,
    };

    // Determine the maximum allowed size of the painting
    const maxPaintingSize: Size = {
      width: size.width / 2,
      height: size.height / 2,
    };

    // Determine the amount needed to scale the painting
    const paintingScale = scaleToFit(sourcePaintingSize, maxPaintingSize);

    const paintingSize: Size = {
      width: sourcePaintingSize.width * paintingScale,
      height: sourcePaintingSize.height * paintingScale,
    };

    // Draw the painting
    context.fillStyle = 'white';
    context.fillRect(
      (size.width - paintingSize.width) / 2,
      (size.height - paintingSize.height) / 2,
      paintingSize.width,
      paintingSize.height,
    );
  };

  return (
    <Portal container={canvasRoot}>
      <Canvas
        width={size.width}
        height={size.height}
        onSetup={setup}
        onDraw={draw}
        targetFramerate={1}
        {...rest}
      />
    </Portal>
  );
};

export default Painting;
