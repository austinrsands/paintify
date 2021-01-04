import React from 'react';
import { Portal } from '@material-ui/core';
import Canvas, { CanvasProps } from '../../../generic/components/canvas';
import Size from '../../util/size';

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
  const setup = (context: CanvasRenderingContext2D) => {
    // ...
  };

  const draw = (context: CanvasRenderingContext2D, deltaTime: number) => {
    context.fillStyle = '#FFFFFF';
    context.fillRect(size.width / 2 - 250, size.height / 2 - 250, 500, 500);
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
