import DirectionField from '../../../lib/structures/direction-field';
import Vector from '../../../lib/structures/vector';
import { drawArrow } from '../arrow';

/**
 * Draws a flow field representation out of arrows
 *
 * @param context the 2D graphics context to draw on
 * @param flowField the flow field to draw
 * @param arrowLength the length of the arrows
 * @param bladeLength the length of the arrows' blades
 */
export const drawFlowField = (
  context: CanvasRenderingContext2D,
  flowField: DirectionField,
  arrowLength: number,
  bladeLength: number,
) => {
  // Determine difference in size between canvas and flow field
  const scale: Vector = {
    x: context.canvas.width / flowField.size.width,
    y: context.canvas.height / flowField.size.height,
  };

  // Draw the flow points
  flowField.flowPoints.forEach((flowPoint) =>
    drawArrow(
      context,
      {
        x: flowPoint.position.x * scale.x,
        y: flowPoint.position.y * scale.y,
      },
      flowPoint.angle,
      arrowLength,
      bladeLength,
    ),
  );
};
