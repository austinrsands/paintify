import ImageMaskingState, {
  DEFAULT_IMAGE_MASKING_STATE,
} from '../../components/sidebar/components/image-masking/store/state';
import ImageState, {
  DEFAULT_IMAGE_STATE,
} from '../../components/sidebar/components/image-upload/store/state';
import StrokeAppearanceState, {
  DEFAULT_STROKE_APPEARANCE_STATE,
} from '../../components/sidebar/components/stroke-appearance/store/state';
import StrokeDirectionState, {
  DEFAULT_STROKE_DIRECTION_STATE,
} from '../../components/sidebar/components/stroke-direction/store/state';
import StrokeSizeState, {
  DEFAULT_STROKE_SIZE_STATE,
} from '../../components/sidebar/components/stroke-size/store/state';

interface AppState {
  isPainting: boolean;
  imageState: ImageState;
  strokeAppearanceState: StrokeAppearanceState;
  strokeSizeState: StrokeSizeState;
  strokeDirectionState: StrokeDirectionState;
  imageMaskingState: ImageMaskingState;
}

export const DEFAULT_APP_STATE: AppState = {
  isPainting: false,
  imageState: DEFAULT_IMAGE_STATE,
  strokeAppearanceState: DEFAULT_STROKE_APPEARANCE_STATE,
  strokeSizeState: DEFAULT_STROKE_SIZE_STATE,
  strokeDirectionState: DEFAULT_STROKE_DIRECTION_STATE,
  imageMaskingState: DEFAULT_IMAGE_MASKING_STATE,
};

export default AppState;
