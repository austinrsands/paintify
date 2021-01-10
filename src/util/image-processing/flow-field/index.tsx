import DirectionField from '../../../lib/structures/direction-field';
import DirectedPoint from '../../../lib/structures/directed-point';
import Size from '../../../lib/structures/size';
import { strokeDirection } from '../stroke-direction';

/**
 * Returns a flow field with angles determined by noise and image properties
 *
 * @param imageData an image
 * @param arrowsPerLine the number of arrows to draw per row
 * @param noiseScale the amount to scale the simplex noise function
 * @param noiseSeed the seed of the simplex noise function
 * @return the generated flow field
 */
export const generateFlowField = (
  imageData: ImageData,
  arrowsPerLine: number,
  noiseScale: number,
  noiseSeed?: string,
) => {
  // Determine spacing of flow points so that they fill the space evenly
  const size: Size = { width: imageData.width, height: imageData.height };
  const spacing = imageData.width / (arrowsPerLine + 1);

  // Create flow points
  const flowPoints: DirectedPoint[] = [];
  for (let y = spacing / 2; y < size.height; y += spacing) {
    for (let x = spacing / 2; x < size.width; x += spacing) {
      const flowPoint: DirectedPoint = {
        position: { x, y },
        angle: strokeDirection(
          imageData,
          { x: Math.floor(x), y: Math.floor(y) },
          noiseScale,
          noiseSeed,
        ),
      };
      flowPoints.push(flowPoint);
    }
  }

  const flowField: DirectionField = { flowPoints, size };
  return flowField;
};
