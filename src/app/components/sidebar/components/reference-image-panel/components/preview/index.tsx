import React from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';

const ReferenceImagePreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  const setup = (context: CanvasRenderingContext2D) => {
    if (state.imageData) context.putImageData(state.imageData, 0, 0);
  };

  return state.imageData ? (
    <TabPanelPreview
      width={state.imageData.width}
      height={state.imageData.height}
      onSetup={setup}
      noLoop
      {...props}
    />
  ) : null;
};
export default ReferenceImagePreview;
