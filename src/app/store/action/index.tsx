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
  | { type: 'update-noise-scale'; scale: number }
  | { type: 'update-noise-seed'; seed: string }
  | { type: 'update-noise-curl'; curl: number }
  | { type: 'update-edge-cutoff'; cutoff: number }
  | { type: 'update-brightness-range'; range: InclusiveRange };

export default AppAction;
