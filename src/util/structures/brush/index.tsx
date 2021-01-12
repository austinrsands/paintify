import Size from '../size';
import Vector from '../vector';

/**
 * Holds information about a bristle
 */
interface BristleDatum {
  offset: Vector;
  paintShift: number;
}

/**
 * Represents a paint brush
 */
class Brush {
  readonly size: Size;
  readonly texture: number;
  readonly bristleDensity: number;
  readonly bristleRadius: number;
  readonly bristleData: BristleDatum[] = [];

  /**
   * Contructs a brush
   *
   * @param size the dimensions of the brush
   * @param texture the texture of the brush
   * @param bristleDensity the density of the bristles
   * @param bristleRadius the radius of the bristles
   * @returns a new brush instance
   */
  constructor(
    size: Size,
    texture: number = 0.5,
    bristleDensity: number = 0.5,
    bristleRadius: number = 0.5,
  ) {
    this.size = size;
    this.bristleDensity = bristleDensity;
    this.texture = texture;
    this.bristleRadius = bristleRadius;
    this.generateBristleData();
  }

  /**
   * Determines the number of bristles in the brush as well as the offset and paint shift for each bristle
   */
  private generateBristleData() {
    const brushArea = (Math.PI * this.size.width * this.size.height) / 4;
    const bristleArea = Math.PI * this.bristleRadius ** 2;
    const numBristles = Math.round(
      (this.bristleDensity * brushArea) / bristleArea,
    );
    for (let i = 0; i < numBristles; i++) {
      // Determine random point in ellipse
      const phi = Math.random() * Math.PI * 2;
      const rho = Math.random();
      const offset: Vector = {
        x: Math.sqrt(rho) * Math.cos(phi) * (this.size.width / 2),
        y: Math.sqrt(rho) * Math.sin(phi) * (this.size.height / 2),
      };

      // Determine whether the bristle should brighten or dim the paint
      const paintShift = Math.random() > 0.5 ? this.texture : -this.texture;

      // Save bristle datum
      const bristleDatum: BristleDatum = {
        offset,
        paintShift,
      };
      this.bristleData.push(bristleDatum);
    }

    // Sort bristles by x offset so they are drawn in correct order
    this.bristleData.sort(
      (a, b) =>
        -a.offset.x + this.size.width / 2 - (-b.offset.x + this.size.width / 2),
    );
  }
}

export default Brush;
