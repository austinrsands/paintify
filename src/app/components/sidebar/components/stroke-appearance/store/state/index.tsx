interface StrokeAppearanceState {
  roundness: number;
  density: number;
  alpha: number;
}

export const DEFAULT_STROKE_APPEARANCE_STATE: StrokeAppearanceState = {
  roundness: 0.5,
  density: 0.5,
  alpha: 0.5,
};

export default StrokeAppearanceState;
