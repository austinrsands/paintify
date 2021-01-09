import SimplexNoise from 'simplex-noise';
import Vector2 from '../../../lib/structures/vector2';
import { convolveWithGrayscale } from '../convolution';
import { SOBEL_X, SOBEL_Y } from '../kernels';

/**
 * Returns the direction that a stroke should be painted
 *
 * @param imageData the image to paint
 * @param point the position of the stroke on the canvas
 * @param noiseScale the amount to scale the simplex noise function
 * @param noiseSeed the seed of the simplex noise function
 * @returns the direction that the stroke should be painted
 */
export const strokeDirection = (
  imageData: ImageData,
  point: Vector2,
  noiseScale: number,
  noiseSeed?: string,
) => {
  // Take sobel derivatives
  const sobelDerivative: Vector2 = {
    x: convolveWithGrayscale(imageData, SOBEL_X, point),
    y: convolveWithGrayscale(imageData, SOBEL_Y, point),
  };

  // Determine edge strength and direction
  const edgeStrength = Math.hypot(sobelDerivative.x, sobelDerivative.y);
  const edgeDirection = Math.atan2(sobelDerivative.y, sobelDerivative.x);

  // Calculate simplex noise angle
  const simplex = new SimplexNoise(noiseSeed);
  const noiseAngle =
    simplex.noise2D(point.x * noiseScale, point.y * noiseScale) * Math.PI * 2;

  // Determine resulting stroke direction
  return edgeStrength === 0 ? noiseAngle : edgeDirection;
};
