import React from 'react';
import Canvas, {
  CanvasProps,
} from '../../../../../../../generic/components/canvas';
import { useAppContext } from '../../../../../../context';

const ReferenceImagePreview: React.FC<
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

  const setup = (context: CanvasRenderingContext2D) => {
    if (state.imageData) context.putImageData(state.imageData, 0, 0);
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
export default ReferenceImagePreview;
