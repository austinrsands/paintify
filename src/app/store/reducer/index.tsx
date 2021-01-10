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
    default: {
      return state;
    }
  }
};

export default AppReducer;
