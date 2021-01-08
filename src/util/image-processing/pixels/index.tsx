import Color from '../../../lib/structures/color';
import Vector2 from '../../../lib/structures/vector2';

// Returns brightness of given color
export const brightness = (color: Color) =>
  (color.red + color.green + color.blue) / 3;

// Returns true if the given point is contained in the given image data
export const pixelIsContained = (imageData: ImageData, point: Vector2) =>
  point.x >= 0 &&
  point.x < imageData.width &&
  point.y >= 0 &&
  point.y < imageData.height;

// Returns the color of the pixel in image data at the given point
export const pixelColor = (
  imageData: ImageData,
  point: Vector2,
): Color | undefined => {
  if (pixelIsContained(imageData, point)) {
    const redIndex = point.y * (imageData.width * 4) + point.x * 4;
    return {
      red: imageData.data[redIndex],
      green: imageData.data[redIndex + 1],
      blue: imageData.data[redIndex + 2],
      alpha: 1,
    };
  }
  return undefined;
};

// Return the brightness of the pixel in image data at the given point
export const pixelBrightness = (
  imageData: ImageData,
  point: Vector2,
): number | undefined => {
  const color = pixelColor(imageData, point);
  return color !== undefined ? brightness(color) : undefined;
};
