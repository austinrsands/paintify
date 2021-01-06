import Color from '../../../lib/structures/color';
import InclusiveRange from '../../../lib/structures/inclusive-range';
import Vector2 from '../../../lib/structures/vector2';
import QuadTree from '../../../lib/structures/quad-tree';
import Size from '../../../lib/structures/size';

// Returns the standard deviation of the given array
export const standardDeviation = (nums: number[]) => {
  const mean = nums.reduce((a, b) => a + b) / nums.length;
  return Math.sqrt(
    nums.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / nums.length,
  );
};

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
  return color !== undefined
    ? (color.red + color.green + color.blue) / 3
    : undefined;
};

// Return list of sampled brightnesses from the given section of the image
const sampleBrightnesses = (
  imageData: ImageData,
  samplingDensity: number,
  position: Vector2,
  size: Size,
): number[] => {
  const brightnesses: number[] = [];
  const numSamples = samplingDensity * size.width * size.height;
  for (let i = 0; i < numSamples; i++) {
    const samplePoint: Vector2 = {
      x: Math.floor(position.x + Math.random() * size.width),
      y: Math.floor(position.y + Math.random() * size.height),
    };
    const sampleBrightness = pixelBrightness(imageData, samplePoint);
    if (sampleBrightness !== undefined) brightnesses.push(sampleBrightness);
  }
  return brightnesses;
};

// Returns a quad tree that has been subdivided according to variation in brightness
const generateQuadTree = (
  imageData: ImageData,
  samplingDensity: number = 0.001,
  subdivisionThreshold: number = 10,
  diagonalRange: InclusiveRange = { min: Math.SQRT1_2, max: 200 },
): QuadTree => {
  // Initialize quad tree
  const quadTree = new QuadTree(
    { x: 0, y: 0 },
    { width: imageData.width, height: imageData.height },
  );

  // Recursively subdivides the given tree as long as many times as necessary
  const deepSubdivide = (tree: QuadTree) => {
    const diagonal = Math.hypot(tree.size.width, tree.size.height);

    // Stop subdividing if next subdivision would make diagonal too small
    if (diagonal / 2 < diagonalRange.min) return;

    // Subdivide if diagonal is too big
    if (diagonal > diagonalRange.max) {
      tree.subdivide();
      if (tree.neighbors.topLeft) deepSubdivide(tree.neighbors.topLeft);
      if (tree.neighbors.topRight) deepSubdivide(tree.neighbors.topRight);
      if (tree.neighbors.bottomLeft) deepSubdivide(tree.neighbors.bottomLeft);
      if (tree.neighbors.bottomRight) deepSubdivide(tree.neighbors.bottomRight);
    }

    // Get samples
    const samples = sampleBrightnesses(
      imageData,
      samplingDensity,
      tree.position,
      tree.size,
    );

    // Continue subdividing if standard deviation of sampled brightness is too large
    if (standardDeviation(samples) > subdivisionThreshold) {
      tree.subdivide();
      if (tree.neighbors.topLeft) deepSubdivide(tree.neighbors.topLeft);
      if (tree.neighbors.topRight) deepSubdivide(tree.neighbors.topRight);
      if (tree.neighbors.bottomLeft) deepSubdivide(tree.neighbors.bottomLeft);
      if (tree.neighbors.bottomRight) deepSubdivide(tree.neighbors.bottomRight);
    }
  };
  deepSubdivide(quadTree);
  return quadTree;
};

export default generateQuadTree;
