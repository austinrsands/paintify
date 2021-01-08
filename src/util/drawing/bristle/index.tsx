import Bristle from '../../../lib/structures/bristle';
import Color from '../../../lib/structures/color';
import Vector2 from '../../../lib/structures/vector2';
import { bezierPoint, bezierTangent } from '../../math';

export const drawBristle = (
  context: CanvasRenderingContext2D,
  bristle: Bristle,
  color: Color,
  start: Vector2,
  control: Vector2,
  end: Vector2,
  lifetime: number,
  timestep: number,
) => {
  // Prevent infinite loops
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
