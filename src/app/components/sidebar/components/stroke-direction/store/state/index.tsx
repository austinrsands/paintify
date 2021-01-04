interface StrokeDirectionState {
  noiseScale: number;
  curl: number;
}

export const DEFAULT_STROKE_DIRECTION_STATE: StrokeDirectionState = {
  noiseScale: 1,
  curl: 1,
};

export default StrokeDirectionState;
