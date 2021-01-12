import InclusiveRange from '../../../util/structures/inclusive-range';
import QuadTree from '../../../util/structures/quad-tree';
import { getRandomSeed } from '../../../util/math';

interface AppState {
  isPainting: boolean;
  imageData?: ImageData;
  paintingContext?: OffscreenCanvasRenderingContext2D;
  brushRoundness: number;
  strokeTexture: number;
  strokeAlpha: number;
  brushDensity: number;
  strokeLengthRatio: number;
  strokeTaper: number;
  strokeLift: number;
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
  brushRoundness: 0.5,
  strokeTexture: 0.1,
  strokeAlpha: 0.4,
  brushDensity: 0.7,
  strokeLengthRatio: 4,
  strokeTaper: 0.1,
  strokeLift: 1,
  quadTreeSamplingDensity: 0.001,
  quadTreeSubdivisionThreshold: 10,
  quadTreeSizeRange: { min: 50, max: 400 },
  noiseScale: 0.0001,
  noiseSeed: getRandomSeed(),
  noiseCurl: 1,
  edgeThreshold: 1,
  brightnessRange: { min: 0, max: 255 },
};

export default AppState;
