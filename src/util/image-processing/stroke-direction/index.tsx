import SimplexNoise from 'simplex-noise';
import Vector from '../../../lib/structures/vector';
import { convolveWithGrayscale } from '../convolution';
import { SOBEL_X, SOBEL_Y } from '../kernels';

/**
 * Returns the direction that a stroke should be painted
 *
 * @param imageData the image to paint
 * @param point the position of the stroke on the canvas
 * @param noiseScale the amount to scale the simplex noise function
 * @param noiseSeed the seed of the simplex noise function
 * @param noiseCurl the amount to curl the noise function
 * @param edgeCutoff the threshold at which the image's edge direction determines the stroke direction
 * @returns the direction that the stroke should be painted
 */
export const strokeDirection = (
  imageData: ImageData,
  point: Vector,
  noiseScale: number,
  noiseSeed: string,
  noiseCurl: number,
  edgeCutoff: number,
) => {
  // Snap point to pixel grid
  const pixelCoordinate: Vector = {
    x: Math.floor(point.x),
    y: Math.floor(point.y),
  };

  // Take sobel derivatives
  const sobelDerivative: Vector = {
    x: convolveWithGrayscale(imageData, SOBEL_X, pixelCoordinate),
    y: convolveWithGrayscale(imageData, SOBEL_Y, pixelCoordinate),
  };

  // Determine edge strength and direction
  const edgeStrength = Math.hypot(sobelDerivative.x, sobelDerivative.y);
  const edgeDirection = Math.atan2(sobelDerivative.y, sobelDerivative.x);

  // Calculate simplex noise angle
  const simplex = new SimplexNoise(noiseSeed);
  const noiseAngle =
    simplex.noise2D(
      pixelCoordinate.x * noiseScale,
      pixelCoordinate.y * noiseScale,
    ) *
    Math.PI *
    2 *
    noiseCurl;

  // Determine resulting stroke direction
  return Math.abs(edgeStrength) < edgeCutoff ? noiseAngle : edgeDirection;
};
