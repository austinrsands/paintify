import DirectionField from '../../../lib/structures/direction-field';
import DirectedPoint from '../../../lib/structures/directed-point';
import Size from '../../../lib/structures/size';
import { strokeDirection } from '../stroke-direction';

/**
 * Returns a direction field with angles determined by noise and image properties
 *
 * @param imageData an image
 * @param arrowsPerLine the number of arrows to draw per row
 * @param noiseScale the amount to scale the simplex noise function
 * @param noiseSeed the seed of the simplex noise function
 * @param noiseCurl the amount to curl the noise function
 * @param edgeCutoff the threshold at which the image's edge direction determines the stroke direction
 * @return the generated direction field
 */
export const generateDirectionField = (
  imageData: ImageData,
  arrowsPerLine: number,
  noiseScale: number,
  noiseSeed: string,
  noiseCurl: number,
  edgeCutoff: number,
) => {
  // Determine spacing of directed points so that they fill the space evenly
  const size: Size = { width: imageData.width, height: imageData.height };
  const spacing = imageData.width / (arrowsPerLine + 1);

  // Create directed points
  const directedPoints: DirectedPoint[] = [];
  for (let y = spacing / 2; y < size.height; y += spacing) {
    for (let x = spacing / 2; x < size.width; x += spacing) {
      const directedPoint: DirectedPoint = {
        position: { x, y },
        angle: strokeDirection(
          imageData,
          { x, y },
          noiseScale,
          noiseSeed,
          noiseCurl,
          edgeCutoff,
        ),
      };
      directedPoints.push(directedPoint);
    }
  }

  const directionField: DirectionField = { directedPoints, size };
  return directionField;
};
