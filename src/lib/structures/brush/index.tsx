import Size from '../size';
import Bristle from '../bristle';
import Vector2 from '../vector2';

class Brush {
  readonly size: Size;
  readonly density: number;
  readonly texture: number;
  readonly bristles: Bristle[] = [];

  constructor(
    size: Size,
    density: number = 0.5,
    texture: number = 0.5,
    bristleRadius: number = 0.5,
  ) {
    this.size = size;
    this.density = density;
    this.texture = texture;
    this.generateBristles(bristleRadius);
  }

  private generateBristles(radius: number) {
    const brushArea = (Math.PI * this.size.width * this.size.height) / 4;
    const bristleArea = Math.PI * radius ** 2;
    const numBristles = Math.round((this.density * brushArea) / bristleArea);
    for (let i = 0; i < numBristles; i++) {
      // Determine random point in ellipse
      const phi = Math.random() * Math.PI * 2;
      const rho = Math.random();
      const offset: Vector2 = {
        x: Math.sqrt(rho) * Math.cos(phi) * (this.size.width / 2),
        y: Math.sqrt(rho) * Math.sin(phi) * (this.size.height / 2),
      };

      // Determine if bristle should become brighter or dimmer
      const shift = Math.random() > 0.5 ? this.texture : -this.texture;

      // Create bristle
      const bristle: Bristle = {
        offset,
        radius,
        shift,
      };
      this.bristles.push(bristle);
    }
  }
}

export default Brush;
