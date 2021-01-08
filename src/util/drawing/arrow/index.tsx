import Vector2 from '../../../lib/structures/vector2';

// Draw an arrow from the given starting position at the given angle with the given properties
export const drawArrow = (
  context: CanvasRenderingContext2D,
  start: Vector2,
  rotation: number,
  length: number,
  bladeLength: number,
  bladeAngle: number = Math.PI / 4,
) => {
  // Determine tip of arrow
  const tip: Vector2 = {
    x: start.x + length * Math.cos(rotation),
    y: start.y - length * Math.sin(rotation),
  };

  // Determine end of left arrow wing
  const left: Vector2 = {
    x: tip.x - bladeLength * Math.cos(bladeAngle - rotation),
    y: tip.y - bladeLength * Math.sin(bladeAngle - rotation),
  };

  // Determin end of right arrow wing
  const right: Vector2 = {
    x: tip.x - bladeLength * Math.sin(bladeAngle - rotation),
    y: tip.y + bladeLength * Math.cos(bladeAngle - rotation),
  };

  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(tip.x, tip.y);
  context.lineTo(left.x, left.y);
  context.moveTo(tip.x, tip.y);
  context.lineTo(right.x, right.y);
  context.stroke();
};