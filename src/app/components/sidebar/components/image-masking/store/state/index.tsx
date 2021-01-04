import BrightnessRange, {
  MAX_BRIGHTNESS,
  MIN_BRIGHTNESS,
} from '../../../../../../util/brightness-range';

interface ImageMaskingState {
  brightnessRange: BrightnessRange;
}

export const DEFAULT_IMAGE_MASKING_STATE: ImageMaskingState = {
  brightnessRange: { min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS },
};

export default ImageMaskingState;
