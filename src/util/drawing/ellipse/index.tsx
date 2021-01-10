import Vector from '../../../lib/structures/vector';

/**
 * Draws a filled ellipse
 *
 * @param context the 2D graphics context to draw on
 * @param position the position of the center of the ellipse
 * @param radii the radii of the ellipse
 * @param rotation the rotation of the ellipse
 */
export const fillEllipse = (
  context: CanvasRenderingContext2D,
  position: Vector,
  radii: Vector,
  rotation: number = 0,
) => {
  context.beginPath();
  context.ellipse(
    position.x,
    position.y,
    radii.x,
    radii.y,
    rotation,
    0,
    Math.PI / 2,
  );
  context.fill();
};
