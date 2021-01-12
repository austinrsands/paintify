import SimplexNoise from 'simplex-noise';
import Vector from '../../structures/vector';

/**
 * Returns the angle of a point in a simplex noise field
 *
 * @param point a point
 * @param noiseScale the amount to scale the simplex noise function
 * @param noiseSeed the seed of the simplex noise function
 * @param noiseCurl the amount to curl the noise function
 * @returns the angle of the given point in the noise field
 */
const noiseDirection = (
  point: Vector,
  noiseScale: number,
  noiseSeed: string,
  noiseCurl: number,
) => {
  // Snap point to pixel grid
  const pixelCoordinate: Vector = {
    x: Math.floor(point.x),
    y: Math.floor(point.y),
  };

  // Calculate simplex noise angle
  const simplex = new SimplexNoise(noiseSeed);
  const direction =
    simplex.noise2D(
      pixelCoordinate.x * noiseScale,
      pixelCoordinate.y * noiseScale,
    ) *
    Math.PI *
    2 *
    noiseCurl;

  return direction;
};

export default noiseDirection;
