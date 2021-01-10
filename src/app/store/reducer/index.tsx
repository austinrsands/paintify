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
        isPainting: false,
      };
    }
    case 'update-quad-tree': {
      return {
        ...state,
        quadTree: action.tree,
      };
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;
