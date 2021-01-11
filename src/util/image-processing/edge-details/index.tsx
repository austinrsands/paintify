import Vector from '../../../lib/structures/vector';
import { convolveWithGrayscale } from '../convolution';
import { SOBEL_X, SOBEL_Y } from '../kernels';

export interface EdgeDetails {
  direction: number;
  strength: number;
}

/**
 * Returns edge information about a point in an image
 *
 * @param imageData an image
 * @param point a point in the image
 * @return an object containing the strength and direction of the edge at the given point in the image
 */
const edgeDetails = (imageData: ImageData, point: Vector) => {
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
  const details: EdgeDetails = {
    direction: edgeDirection,
    strength: edgeStrength,
  };

  return details;
};

export default edgeDetails;
