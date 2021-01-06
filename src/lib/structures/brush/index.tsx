import Vector2 from '../vector2';
import Size from '../size';

class Brush {
  readonly size: Size;
  readonly density: number;
  readonly alpha: number;
  readonly bristleRadius: number;
  readonly bristleOffsets: Vector2[] = [];

  constructor(
    size: Size,
    density: number,
    bristleAlpha: number,
    bristleRadius: number = 0.5,
  ) {
    this.size = size;
    this.density = density;
    this.alpha = bristleAlpha;
    this.bristleRadius = bristleRadius;
    this.generateBristles();
  }

  private generateBristles() {
    const brushArea = (Math.PI * this.size.width * this.size.height) / 4;
    const bristleArea = Math.PI * this.bristleRadius ** 2;
    const numBristles = Math.round((this.density * brushArea) / bristleArea);
    for (let i = 0; i < numBristles; i++) {
      const phi = Math.random() * Math.PI * 2;
      const rho = Math.random();
      this.bristleOffsets.push({
        x: Math.sqrt(rho) * Math.cos(phi) * (this.size.width / 2),
        y: Math.sqrt(rho) * Math.sin(phi) * (this.size.height / 2),
      });
    }
  }
}

export default Brush;
