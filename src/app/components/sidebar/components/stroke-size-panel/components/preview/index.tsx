import React, { useCallback } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { drawQuadTree } from '../../../../../../../util/drawing/quad-tree';

const PREVIEW_WIDTH = 500;

const QuadTreePreview: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  // Draw quad tree
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (state.quadTree) {
        context.fillStyle = 'white';
        fillBackground(context);
        context.lineWidth = 1;
        drawQuadTree(context, state.quadTree);
      }
    },
    [state.quadTree],
  );

  return state.imageData ? (
    <TabPanelPreview
      width={PREVIEW_WIDTH}
      height={PREVIEW_WIDTH * (state.imageData.height / state.imageData.width)}
      onSetup={setup}
      noLoop
      {...props}
    />
  ) : null;
};
export default QuadTreePreview;
