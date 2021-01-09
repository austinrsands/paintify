import InclusiveRange from '../../../lib/structures/inclusive-range';
import QuadTree from '../../../lib/structures/quad-tree';
import Size from '../../../lib/structures/size';
import Vector2 from '../../../lib/structures/vector2';
import { standardDeviation } from '../../math';
import { pixelBrightness } from '../pixels';

/**
 * Returns an array of pixel brightness values sampled from an image
 *
 * @param imageData the image to sample
 * @param samplingDensity the density at which to sample points
 * @param position the top left corner of the sampling area
 * @param size the size of the sampling area
 * @returns an array of pixel brightness values sampled from the given area of the image
 */
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
    brightnesses.push(sampleBrightness);
  }
  return brightnesses;
};

/**
 * Returns a quad tree that has been subdivided in areas of detail in an image
 *
 * @param imageData the image used to generate the quad tree
 * @param samplingDensity the density at which to sample points
 * @param subdivisionThreshold the standard deviation of brightness values at which to start subdividing
 * @param subtreeDiagonalRange the range of allowed quad tree diagonal lengths
 * @returns the generated quad tree
 */
export const generateQuadTree = (
  imageData: ImageData,
  samplingDensity: number,
  subdivisionThreshold: number,
  subtreeDiagonalRange: InclusiveRange = { min: Math.SQRT1_2, max: 200 },
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
    if (diagonal / 2 < subtreeDiagonalRange.min) return;

    // Subdivide if diagonal is too big
    if (diagonal > subtreeDiagonalRange.max) {
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
