import QuadTree from '../../../lib/structures/quad-tree';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'update-image-data'; data: ImageData }
  | {
      type: 'update-painting-context';
      context: OffscreenCanvasRenderingContext2D;
    }
  | { type: 'update-quad-tree'; tree: QuadTree };

export default AppAction;
