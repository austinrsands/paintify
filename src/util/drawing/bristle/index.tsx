import Bristle from '../../../lib/structures/bristle';
import Color from '../../../lib/structures/color';
import Vector2 from '../../../lib/structures/vector2';
import { bezierPoint, bezierTangent } from '../../math';

/**
 * Draws a paint brush bristle
 *
 * @param context the 2D graphics context to draw on
 * @param bristle the bristle to draw
 * @param color the color to draw the bristle
 * @param start the starting position of the bristle's path
 * @param control the control point of the bristle's path
 * @param end the ending point of the bristle's path
 * @param lifetime the lifetime of the bristle's path in the range (0, 1]
 * @param numSegments the number of segments used to draw the bristle
 */
export const drawBristle = (
  context: CanvasRenderingContext2D,
  bristle: Bristle,
  color: Color,
  start: Vector2,
  control: Vector2,
  end: Vector2,
  lifetime: number,
  numSegments: number,
) => {
  // Prevent infinite loops
  const timestep = lifetime / numSegments;
  if (timestep <= 0 || lifetime <= 0) return;

  // Configure context
  context.strokeStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
  context.lineWidth = bristle.radius * 2;
  context.lineCap = 'round';

  context.beginPath();
  for (let time = 0; time <= lifetime; time += timestep) {
    const currentBrushPosition: Vector2 = {
      x: bezierPoint(start.x, control.x, end.x, time),
      y: bezierPoint(start.y, control.y, end.y, time),
    };
    const currentTangent: Vector2 = {
      x: bezierTangent(start.x, control.x, end.x, time),
      y: bezierTangent(start.y, control.y, end.y, time),
    };
    const currentRotation = Math.atan2(currentTangent.y, currentTangent.x);

    const currentBristlePosition: Vector2 = {
      x:
        currentBrushPosition.x +
        Math.cos(currentRotation) * bristle.offset.x -
        Math.sin(currentRotation) * bristle.offset.y,
      y:
        currentBrushPosition.y +
        Math.sin(currentRotation) * bristle.offset.x +
        Math.cos(currentRotation) * bristle.offset.y,
    };

    if (time !== 0) {
      context.lineTo(currentBristlePosition.x, currentBristlePosition.y);
      context.stroke();
    }
    context.moveTo(currentBristlePosition.x, currentBristlePosition.y);
  }
};
