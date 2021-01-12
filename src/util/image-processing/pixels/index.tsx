import Color from '../../structures/color';
import Vector from '../../structures/vector';

/**
 * Returns brightness of a color
 *
 * @param color a color
 * @returns the brightness of the given color
 */
export const brightness = (color: Color) =>
  (color.red + color.green + color.blue) / 3;

/**
 * Returns whether a point is contained in an image
 *
 * @param imageData an image
 * @param point the point to check
 * @returns whether the given point is in the image
 */
export const validPointInImage = (imageData: ImageData, point: Vector) =>
  Number.isInteger(point.x) &&
  Number.isInteger(point.y) &&
  point.x >= 0 &&
  point.x < imageData.width &&
  point.y >= 0 &&
  point.y < imageData.height;

/**
 * Returns the color a pixel in an image
 *
 * @param imageData an image
 * @param point the point in the image whose pixel color is to be determined
 * @return the color of pixel at the given point in the image
 */
export const pixelColor = (imageData: ImageData, point: Vector): Color => {
  // Return solid black if given point is not in the image
  if (!validPointInImage(imageData, point))
    return { red: 0, green: 0, blue: 0, alpha: 1 };

  // Determine color at the given point
  const redIndex = point.y * (imageData.width * 4) + point.x * 4;
  return {
    red: imageData.data[redIndex],
    green: imageData.data[redIndex + 1],
    blue: imageData.data[redIndex + 2],
    alpha: imageData.data[redIndex + 3],
  };
};

/**
 * Return the brightness of a pixel in an image
 *
 * @param imageData an image
 * @param point the point in the image whose pixel brightness is to be determined
 * @return the brightness of the pixel at the given point in the image
 */
export const pixelBrightness = (
  imageData: ImageData,
  point: Vector,
): number => {
  const color = pixelColor(imageData, point);
  return brightness(color);
};
