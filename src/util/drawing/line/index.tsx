import Vector2 from '../../../lib/structures/vector2';

export const drawLine = (
  context: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2,
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};
