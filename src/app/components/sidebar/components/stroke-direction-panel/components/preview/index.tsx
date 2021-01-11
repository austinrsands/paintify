import React, { useCallback } from 'react';
import TabPanelPreview from '../../../../../../../lib/components/tab-panel/preview';
import { useAppContext } from '../../../../../../context';
import StyleProps from '../../../../../../../lib/structures/style-props';
import { fillBackground } from '../../../../../../../util/drawing/background';
import { drawDirectionField } from '../../../../../../../util/drawing/direction-field';
import DirectionField from '../../../../../../../lib/structures/direction-field';

const PREVIEW_WIDTH = 500;
const ARROW_LENGTH = 8;
const ARROW_BLADE_LENGTH = 2;

interface Props {
  directionField: DirectionField;
}

const DirectionFieldPreview: React.FC<Props & StyleProps> = ({
  directionField,
  ...rest
}) => {
  const { state } = useAppContext();

  // Draw direction field
  const setup = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (directionField) {
        context.fillStyle = 'white';
        fillBackground(context);
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        drawDirectionField(
          context,
          directionField,
          ARROW_LENGTH,
          ARROW_BLADE_LENGTH,
        );
      }
    },
    [directionField],
  );

  return state.imageData ? (
    <TabPanelPreview
      width={PREVIEW_WIDTH}
      height={PREVIEW_WIDTH * (state.imageData.height / state.imageData.width)}
      onSetup={setup}
      noLoop
      {...rest}
    />
  ) : null;
};
export default DirectionFieldPreview;
