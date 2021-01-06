import React from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import { drawQuadTree, fillBackground } from '../../../../../../util/drawing';
import StyleProps from '../../../../../../../lib/structures/style-props';

const QuadTreePreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  // Draw quad tree
  const setup = (context: CanvasRenderingContext2D) => {
    if (state.quadTree) {
      fillBackground(context);
      drawQuadTree(context, state.quadTree);
    }
  };

  return state.imageData ? (
    <TabPanelPreview
      width={state.imageData.width}
      height={state.imageData.height}
      onSetup={setup}
      {...props}
    />
  ) : null;
};
export default QuadTreePreview;
