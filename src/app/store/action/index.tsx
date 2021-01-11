import InclusiveRange from '../../../lib/structures/inclusive-range';
import QuadTree from '../../../lib/structures/quad-tree';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'update-image-data'; data: ImageData }
  | {
      type: 'update-painting-context';
      context: OffscreenCanvasRenderingContext2D;
    }
  | { type: 'update-quad-tree'; tree: QuadTree }
  | { type: 'update-quad-tree-sampling-density'; density: number }
  | { type: 'update-quad-tree-subdivision-threshold'; threshold: number }
  | { type: 'update-quad-tree-size-range'; range: InclusiveRange }
  | { type: 'update-noise-scale'; scale: number }
  | { type: 'update-noise-seed'; seed: string }
  | { type: 'update-noise-curl'; curl: number }
  | { type: 'update-edge-threshold'; threshold: number }
  | { type: 'update-brightness-range'; range: InclusiveRange };

export default AppAction;
