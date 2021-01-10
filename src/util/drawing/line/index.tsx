import Vector from '../../../lib/structures/vector';

/**
 * Draws a line segment
 *
 * @param context the 2D graphics context to draw on
 * @param start the starting point of the line segment
 * @param end the ending point of the line segment
 */
export const drawLineSegment = (
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  start: Vector,
  end: Vector,
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};
