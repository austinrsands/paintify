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
    case 'update-quad-tree-sampling-density': {
      return {
        ...state,
        quadTreeSamplingDensity: action.density,
      };
    }
    case 'update-quad-tree-subdivision-threshold': {
      return {
        ...state,
        quadTreeSubdivisionThreshold: action.threshold,
      };
    }
    case 'update-quad-tree-size-range': {
      return {
        ...state,
        quadTreeSizeRange: action.range,
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
    case 'update-edge-threshold': {
      return {
        ...state,
        edgeCutoff: action.threshold,
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
