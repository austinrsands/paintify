import DirectedPoint from '../../../lib/structures/directed-point';
import DirectionField from '../../../lib/structures/direction-field';
import Size from '../../../lib/structures/size';
import Vector from '../../../lib/structures/vector';
import { EdgeDetails } from '../edge-details';

/**
 * Returns the direction that a stroke should be painted
 *
 * @param edgeDirection the direction of the edge
 * @param edgeStrength the strength of the edge
 * @param edgeThreshold the threshold at which the image's edge direction determines the stroke direction
 * @returns the direction that the stroke should be painted
 */
const strokeDirection = (
  edgeDirection: number,
  noiseDirection: number,
  edgeStrength: number,
  edgeThreshold: number,
) => (Math.abs(edgeStrength) < edgeThreshold ? noiseDirection : edgeDirection);

export default strokeDirection;

/**
 * Returns a direction field for paint strokes
 *
 * @param size the size of the direction field
 * @param points the points that make up the direction field
 * @param edgeInformation the edge details for every point
 * @param noiseInformation the noise directions for every point
 * @param edgeThreshold the threshold at which the image's edge direction determines the stroke direction
 * @returns the direction field for paint strokes
 */
export const strokeDirectionField = (
  size: Size,
  points: Vector[],
  edgeInformation: EdgeDetails[],
  noiseInformation: number[],
  edgeThreshold: number,
): DirectionField => {
  const directedPoints: DirectedPoint[] = [];
  if (
    points.length !== edgeInformation.length ||
    points.length !== noiseInformation.length
  )
    return { size, directedPoints };

  // Determine direction for each point
  for (let i = 0; i < points.length; i++) {
    const edgeDirection = edgeInformation[i].direction;
    const edgeStrength = edgeInformation[i].strength;
    const noiseDirection = noiseInformation[i];
    const point = points[i];
    const direction = strokeDirection(
      edgeDirection,
      noiseDirection,
      edgeStrength,
      edgeThreshold,
    );
    const directedPoint: DirectedPoint = { point, direction };
    directedPoints.push(directedPoint);
  }

  // Create direction field
  const directionField: DirectionField = {
    size,
    directedPoints,
  };
  return directionField;
};
