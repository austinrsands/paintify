import AppAction from '../action';
import AppState from '../state';

const AppReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'toggle-paint': {
      return {
        ...state,
        isPainting: !state.isPainting,
      };
    }
    case 'update-image-data': {
      return {
        ...state,
        imageData: action.data,
      };
    }
    case 'update-painting-context': {
      return {
        ...state,
        paintingContext: action.context,
        isPainting: false,
      };
    }
    case 'update-quad-tree': {
      return {
        ...state,
        quadTree: action.tree,
      };
    }
    case 'update-noise-scale': {
      return {
        ...state,
        noiseScale: action.scale,
      };
    }
    case 'update-noise-seed': {
      return {
        ...state,
        noiseSeed: action.seed,
      };
    }
    case 'update-noise-curl': {
      return {
        ...state,
        noiseCurl: action.curl,
      };
    }
    case 'update-edge-cutoff': {
      return {
        ...state,
        edgeCutoff: action.cutoff,
      };
    }
    case 'update-brightness-range': {
      return {
        ...state,
        brightnessRange: action.range,
      };
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;
