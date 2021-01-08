import FlowField from '../../../lib/structures/flow-field';
import FlowPoint from '../../../lib/structures/flow-point';
import Size from '../../../lib/structures/size';
import { strokeDirection } from '../stroke-direction';

// Returns a flow field with angles determined by noise and image properties
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
  const flowPoints: FlowPoint[] = [];
  for (let y = spacing / 2; y < size.height; y += spacing) {
    for (let x = spacing / 2; x < size.width; x += spacing) {
      const flowPoint: FlowPoint = {
        position: { x, y },
        angle: strokeDirection(imageData, { x, y }, noiseScale, noiseSeed),
      };
      flowPoints.push(flowPoint);
    }
  }

  const flowField: FlowField = { flowPoints, size };
  return flowField;
};
