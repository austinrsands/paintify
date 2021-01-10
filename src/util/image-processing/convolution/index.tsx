import Vector from '../../../lib/structures/vector';
import { isOdd } from '../../math';
import { pixelBrightness } from '../pixels';

/**
 * Returns whether the given kernel is an odd square
 *
 * @param kernel a kernel
 * @returns whether the kernel is valid
 */
export const kernelIsValid = (kernel: number[][]) =>
  isOdd(kernel.length) && kernel.every((row) => row.length === kernel.length);

/**
 * Returns the result of applying a convolution kernel at a point in an image
 *
 * @param imageData an image
 * @param kernel the kernel to convolve
 * @param point the point in the image at which to convolve the kernel
 * @return the result of the kernel convolution operation
 */
export const convolveWithGrayscale = (
  imageData: ImageData,
  kernel: number[][],
  point: Vector,
) => {
  // Return brightness of given point if kernel is invalid
  if (!kernelIsValid) return pixelBrightness(imageData, point);

  // Determine point in image corresponding to top left of kernel
  const startingPoint: Vector = {
    x: point.x - Math.floor(kernel.length / 2),
    y: point.y - Math.floor(kernel.length / 2),
  };

  // Apply the kernel operation
  let sum = 0;
  kernel.forEach((row, rowIndex) =>
    row.forEach((num, columnIndex) => {
      const currentPoint: Vector = {
        x: startingPoint.x + rowIndex,
        y: startingPoint.y + columnIndex,
      };
      const brightness = pixelBrightness(imageData, currentPoint) || 0;
      sum += num * brightness;
    }),
  );
  return sum;
};
