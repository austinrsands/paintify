import QuadTree from '../../../lib/structures/quad-tree';

interface AppState {
  isPainting: boolean;
  imageData?: ImageData;
  quadTree?: QuadTree;
}

export const DEFAULT_APP_STATE: AppState = {
  isPainting: false,
};

export default AppState;
