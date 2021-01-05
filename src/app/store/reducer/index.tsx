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
    case 'reset': {
      return {
        // TODO: implement reset
        ...state,
      };
    }
    case 'update-image-data': {
      return {
        ...state,
        imageData: action.data,
      };
    }
    case 'update-brush-roundness': {
      return {
        ...state,
        brushRoundness: action.roundness,
      };
    }
    case 'update-brush-density': {
      return {
        ...state,
        brushDensity: action.density,
      };
    }
    case 'update-bristle-alpha': {
      return {
        ...state,
        bristleAlpha: action.alpha,
      };
    }
    case 'update-noise-scale': {
      return {
        ...state,
        noiseScale: action.scale,
      };
    }
    case 'update-quad-tree': {
      return {
        ...state,
        quadTree: action.tree,
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
