import Color from '../../../lib/structures/color';
import Vector from '../../../lib/structures/vector';
import { bezierPoint, bezierTangent } from '../../math';

/**
 * Draws a paint brush bristle
 *
 * @param context the 2D graphics context to draw on
 * @param radius the radius of the bristle
 * @param offset the difference between the position of the bristle and the brush
 * @param color the color to draw the bristle
 * @param start the starting position of the bristle's path
 * @param control the control point of the bristle's path
 * @param end the ending point of the bristle's path
 * @param lifetime the lifetime of the bristle's path in the range (0, 1]
 * @param numSegments the number of segments used to draw the bristle
 */
export const drawBristle = (
  context: CanvasRenderingContext2D,
  radius: number,
  offset: Vector,
  color: Color,
  start: Vector,
  control: Vector,
  end: Vector,
  lifetime: number,
  numSegments: number,
) => {
  // Prevent infinite loops
  const timestep = lifetime / numSegments;
  if (timestep <= 0 || lifetime <= 0) return;

  // Configure context
  context.strokeStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
  context.lineWidth = radius * 2;
  context.lineCap = 'round';

  context.beginPath();
  for (let time = 0; time <= lifetime; time += timestep) {
    const currentBrushPosition: Vector = {
      x: bezierPoint(start.x, control.x, end.x, time),
      y: bezierPoint(start.y, control.y, end.y, time),
    };
    const currentTangent: Vector = {
      x: bezierTangent(start.x, control.x, end.x, time),
      y: bezierTangent(start.y, control.y, end.y, time),
    };
    const currentRotation = Math.atan2(currentTangent.y, currentTangent.x);

    const currentBristlePosition: Vector = {
      x:
        currentBrushPosition.x +
        Math.cos(currentRotation) * offset.x -
        Math.sin(currentRotation) * offset.y,
      y:
        currentBrushPosition.y +
        Math.sin(currentRotation) * offset.x +
        Math.cos(currentRotation) * offset.y,
    };

    if (time !== 0) {
      context.lineTo(currentBristlePosition.x, currentBristlePosition.y);
      context.stroke();
    }
    context.moveTo(currentBristlePosition.x, currentBristlePosition.y);
  }
};
