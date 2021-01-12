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
    case 'update-brush-roundness': {
      return {
        ...state,
        brushRoundness: action.roundness,
      };
    }
    case 'update-stroke-texture': {
      return {
        ...state,
        strokeTexture: action.texture,
      };
    }
    case 'update-stroke-alpha': {
      return {
        ...state,
        strokeAlpha: action.alpha,
      };
    }
    case 'update-brush-density': {
      return {
        ...state,
        brushDensity: action.density,
      };
    }
    case 'update-stroke-length-ratio': {
      return {
        ...state,
        strokeLengthRatio: action.ratio,
      };
    }
    case 'update-stroke-taper': {
      return {
        ...state,
        strokeTaper: action.taper,
      };
    }
    case 'update-stroke-lift': {
      return {
        ...state,
        strokeLift: action.lift,
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
        edgeThreshold: action.threshold,
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
