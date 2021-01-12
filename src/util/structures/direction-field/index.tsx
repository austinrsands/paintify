import DirectedPoint from '../directed-point';
import Size from '../size';

/**
 * Represents a field of directed points
 */
interface DirectionField {
  directedPoints: DirectedPoint[];
  size: Size;
}

export default DirectionField;
