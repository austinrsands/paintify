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
    case 'update-image-state': {
      return {
        ...state,
        imageState: action.state,
      };
    }
    case 'update-stroke-appearance-state': {
      return {
        ...state,
        strokeAppearanceState: action.state,
      };
    }
    case 'update-stroke-size-state': {
      return {
        ...state,
        strokeSizeState: action.state,
      };
    }
    case 'update-stroke-direction-state': {
      return {
        ...state,
        strokeDirectionState: action.state,
      };
    }
    case 'update-image-masking-state': {
      return {
        ...state,
        imageMaskingState: action.state,
      };
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;
