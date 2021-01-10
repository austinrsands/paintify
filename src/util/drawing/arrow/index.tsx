import Vector from '../../../lib/structures/vector';

/**
 * Draws an arrow
 *
 * @param context the 2D graphics context to draw on
 * @param start the starting position of the arrow
 * @param rotation the rotation of the arrow
 * @param length the length of the arrow
 * @param bladeLength the length of the arrow's blades
 * @param bladeAngle the angle of the arrow's blades relative to the shaft
 */
export const drawArrow = (
  context: CanvasRenderingContext2D,
  start: Vector,
  rotation: number,
  length: number,
  bladeLength: number,
  bladeAngle: number = Math.PI / 4,
) => {
  // Determine tip of arrow
  const tip: Vector = {
    x: start.x + length * Math.cos(rotation),
    y: start.y - length * Math.sin(rotation),
  };

  // Determine end of left arrow wing
  const left: Vector = {
    x: tip.x - bladeLength * Math.cos(bladeAngle - rotation),
    y: tip.y - bladeLength * Math.sin(bladeAngle - rotation),
  };

  // Determin end of right arrow wing
  const right: Vector = {
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
