import SimplexNoise from 'simplex-noise';
import Vector2 from '../../../lib/structures/vector2';

export const strokeDirection = (
  imageData: ImageData,
  position: Vector2,
  noiseScale: number,
  noiseSeed?: string,
) => {
  const simplex = new SimplexNoise(noiseSeed);
  return (
    simplex.noise2D(position.x * noiseScale, position.y * noiseScale) *
    Math.PI *
    2
  );
};
