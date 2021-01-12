import InclusiveRange from '../../../util/structures/inclusive-range';
import QuadTree from '../../../util/structures/quad-tree';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'update-image-data'; data: ImageData }
  | {
      type: 'update-painting-context';
      context: OffscreenCanvasRenderingContext2D;
    }
  | { type: 'update-brush-roundness'; roundness: number }
  | { type: 'update-stroke-texture'; texture: number }
  | { type: 'update-stroke-alpha'; alpha: number }
  | { type: 'update-brush-density'; density: number }
  | { type: 'update-stroke-length'; length: number }
  | { type: 'update-stroke-taper'; taper: number }
  | { type: 'update-stroke-lift'; lift: number }
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
