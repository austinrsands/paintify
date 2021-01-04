import ImageMaskingState from '../../components/sidebar/components/image-masking/store/state';
import ImageState from '../../components/sidebar/components/image-upload/store/state';
import StrokeAppearanceState from '../../components/sidebar/components/stroke-appearance/store/state';
import StrokeDirectionState from '../../components/sidebar/components/stroke-direction/store/state';
import StrokeSizeState from '../../components/sidebar/components/stroke-size/store/state';

type AppAction =
  | { type: 'toggle-paint' }
  | { type: 'reset' }
  | { type: 'update-image-state'; state: ImageState }
  | { type: 'update-stroke-appearance-state'; state: StrokeAppearanceState }
  | { type: 'update-stroke-size-state'; state: StrokeSizeState }
  | { type: 'update-stroke-direction-state'; state: StrokeDirectionState }
  | { type: 'update-image-masking-state'; state: ImageMaskingState };

export default AppAction;
