import Vector from '../../structures/vector';

/**
 * Returns an array of points on an image that fall on a grid
 *
 * @param imageData an image
 * @param pointsPerRow the number of grid points per row
 */
const generateGridPoints = (imageData: ImageData, pointsPerRow: number) => {
  const spacing = imageData.width / (pointsPerRow + 1);
  const points: Vector[] = [];
  for (let y = spacing / 2; y < imageData.height; y += spacing) {
    for (let x = spacing / 2; x < imageData.width; x += spacing) {
      points.push({ x, y });
    }
  }
  return points;
};

export default generateGridPoints;
