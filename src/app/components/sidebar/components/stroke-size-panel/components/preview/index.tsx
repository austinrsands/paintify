import React from 'react';
import Canvas, {
  CanvasProps,
} from '../../../../../../../generic/components/canvas';
import { useAppContext } from '../../../../../../context';
import { drawQuadTree } from '../../../../../../util/drawing';

const QuadTreePreview: React.FC<
  Omit<
    CanvasProps,
    | 'width'
    | 'height'
    | 'onSetup'
    | 'onDraw'
    | 'onPredraw'
    | 'onPostdraw'
    | 'targetFramerate'
  >
> = (props) => {
  const { state } = useAppContext();

  // Draw quad tree
  const setup = (context: CanvasRenderingContext2D) => {
    if (state.quadTree) drawQuadTree(context, state.quadTree);
  };

  return state.imageData ? (
    <Canvas
      width={state.imageData.width}
      height={state.imageData.height}
      onSetup={setup}
      {...props}
    />
  ) : null;
};
export default QuadTreePreview;
