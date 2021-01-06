import InclusiveRange from '../inclusive-range';

type BrightnessRange = InclusiveRange;

export const MAX_BRIGHTNESS = 255;
export const MIN_BRIGHTNESS = 0;
export const FULL_RANGE = { min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS };

export default BrightnessRange;
