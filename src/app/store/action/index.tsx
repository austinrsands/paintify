import QuadTree from '../../../lib/structures/quad-tree';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'reset' }
  | { type: 'update-image-data'; data: ImageData }
  | { type: 'update-quad-tree'; tree: QuadTree };

export default AppAction;
