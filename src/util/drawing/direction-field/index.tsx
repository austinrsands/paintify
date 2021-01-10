import DirectionField from '../../../lib/structures/direction-field';
import Vector from '../../../lib/structures/vector';
import { drawArrow } from '../arrow';

/**
 * Draws a direction field representation out of arrows
 *
 * @param context the 2D graphics context to draw on
 * @param directionField the direction field to draw
 * @param arrowLength the length of the arrows
 * @param bladeLength the length of the arrows' blades
 */
export const drawDirectionField = (
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  directionField: DirectionField,
  arrowLength: number,
  bladeLength: number,
) => {
  // Determine difference in size between canvas and direction field
  const scale: Vector = {
    x: context.canvas.width / directionField.size.width,
    y: context.canvas.height / directionField.size.height,
  };

  // Draw the directed points
  directionField.directedPoints.forEach((directedPoint) =>
    drawArrow(
      context,
      {
        x: directedPoint.position.x * scale.x,
        y: directedPoint.position.y * scale.y,
      },
      directedPoint.angle,
      arrowLength,
      bladeLength,
    ),
  );
};
