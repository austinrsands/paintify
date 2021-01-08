import Vector2 from '../../../lib/structures/vector2';
import { isOdd } from '../../math';
import { pixelBrightness } from '../pixels';

export const kernelIsValid = (kernel: number[][]) =>
  isOdd(kernel.length) && kernel.every((row) => row.length === kernel.length);

export const convolveWithGrayscale = (
  imageData: ImageData,
  kernel: number[][],
  point: Vector2,
) => {
  // Return brightness of given point if kernel is invalid
  if (!kernelIsValid) return pixelBrightness(imageData, point);

  // Determine point in image corresponding to top left of kernel
  const startingPoint: Vector2 = {
    x: point.x - Math.floor(kernel.length / 2),
    y: point.y - Math.floor(kernel.length / 2),
  };

  // Apply the kernel operation
  let sum = 0;
  kernel.forEach((row, rowIndex) =>
    row.forEach((num, columnIndex) => {
      const currentPoint: Vector2 = {
        x: startingPoint.x + rowIndex,
        y: startingPoint.y + columnIndex,
      };
      const brightness = pixelBrightness(imageData, currentPoint) || 0;
      sum += num * brightness;
    }),
  );
  return sum;
};
