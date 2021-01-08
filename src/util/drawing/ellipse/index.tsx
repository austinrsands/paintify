import Vector2 from '../../../lib/structures/vector2';

export const fillEllipse = (
  context: CanvasRenderingContext2D,
  position: Vector2,
  radii: Vector2,
  rotation: number = 0,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  antiClockwise?: boolean,
) => {
  context.beginPath();
  context.ellipse(
    position.x,
    position.y,
    radii.x,
    radii.y,
    rotation,
    startAngle,
    endAngle,
    antiClockwise,
  );
  context.fill();
};
