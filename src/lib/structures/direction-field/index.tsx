import DirectedPoint from '../directed-point';
import Size from '../size';

/**
 * Represents a field of directed points
 */
interface DirectionField {
  flowPoints: DirectedPoint[];
  size: Size;
}

export default DirectionField;
