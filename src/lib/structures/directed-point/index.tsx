import Vector from '../vector';

/**
 * Represents a point with a direction
 */
interface DirectedPoint {
  position: Vector;
  angle: number;
}

export default DirectedPoint;
