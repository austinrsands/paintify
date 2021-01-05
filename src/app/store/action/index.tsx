import BrightnessRange from '../../util/brightness-range';
import QuadTree from '../../util/quad-tree';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'reset' }
  | { type: 'update-image-data'; data: ImageData }
  | { type: 'update-brush-roundness'; roundness: number }
  | { type: 'update-brush-density'; density: number }
  | { type: 'update-bristle-alpha'; alpha: number }
  | { type: 'update-noise-scale'; scale: number }
  | { type: 'update-quad-tree'; tree: QuadTree }
  | { type: 'update-brightness-range'; range: BrightnessRange };

export default AppAction;
