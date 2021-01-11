import InclusiveRange from '../../../lib/structures/inclusive-range';
import QuadTree from '../../../lib/structures/quad-tree';
import { randomSeed } from '../../../util/math';

interface AppState {
  isPainting: boolean;
  imageData?: ImageData;
  paintingContext?: OffscreenCanvasRenderingContext2D;
  quadTree?: QuadTree;
  noiseScale: number;
  noiseSeed: string;
  noiseCurl: number;
  edgeCutoff: number;
  brightnessRange: InclusiveRange;
}

export const DEFAULT_APP_STATE: AppState = {
  isPainting: false,
  noiseScale: 0.0001,
  noiseSeed: randomSeed(),
  noiseCurl: 1,
  edgeCutoff: 1,
  brightnessRange: { min: 0, max: 255 },
};

export default AppState;
