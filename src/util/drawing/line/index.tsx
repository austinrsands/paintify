import Vector2 from '../../../lib/structures/vector2';

/**
 * Draws a line segment
 *
 * @param context the 2D graphics context to draw on
 * @param start the starting point of the line segment
 * @param end the ending point of the line segment
 */
export const drawLineSegment = (
  context: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2,
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};
