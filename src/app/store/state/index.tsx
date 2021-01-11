import InclusiveRange from '../../../lib/structures/inclusive-range';
import QuadTree from '../../../lib/structures/quad-tree';
import { randomSeed } from '../../../util/math';

interface AppState {
  isPainting: boolean;
  imageData?: ImageData;
  paintingContext?: OffscreenCanvasRenderingContext2D;
  quadTree?: QuadTree;
  quadTreeSamplingDensity: number;
  quadTreeSubdivisionThreshold: number;
  quadTreeSizeRange: InclusiveRange;
  noiseScale: number;
  noiseSeed: string;
  noiseCurl: number;
  edgeThreshold: number;
  brightnessRange: InclusiveRange;
}

export const DEFAULT_APP_STATE: AppState = {
  isPainting: false,
  quadTreeSamplingDensity: 0.001,
  quadTreeSubdivisionThreshold: 10,
  quadTreeSizeRange: { min: 50, max: 400 },
  noiseScale: 0.0001,
  noiseSeed: randomSeed(),
  noiseCurl: 1,
  edgeThreshold: 1,
  brightnessRange: { min: 0, max: 255 },
};

export default AppState;
