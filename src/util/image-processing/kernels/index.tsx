export const SHARPEN = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

export const BOX_BLUR = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];

export const SOBEL_X = [
  [1, 0, -1],
  [2, 0, -2],
  [1, 0, -1],
];

export const SOBEL_Y = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1],
];
