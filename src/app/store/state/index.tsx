import BrightnessRange, { FULL_RANGE } from '../../util/brightness-range';
import QuadTree from '../../util/quad-tree';

interface AppState {
  isPainting: boolean;
  imageData?: ImageData;
  brushRoundness: number;
  brushDensity: number;
  bristleAlpha: number;
  noiseScale: number;
  quadTree?: QuadTree;
  brightnessRange: BrightnessRange;
}

export const DEFAULT_APP_STATE: AppState = {
  isPainting: false,
  brushRoundness: 0.5,
  brushDensity: 0.5,
  bristleAlpha: 0.5,
  noiseScale: 1,
  brightnessRange: FULL_RANGE,
};

export default AppState;
