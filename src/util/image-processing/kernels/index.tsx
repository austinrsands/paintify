/**
 * a 3x3 sharpening kernel
 */
export const SHARPEN = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

/**
 * a 3x3 box-bluring kernel
 */
export const BOX_BLUR = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];

/**
 * a 3x3 horizontal sobel kernel
 */
export const SOBEL_X = [
  [1, 0, -1],
  [2, 0, -2],
  [1, 0, -1],
];

/**
 * a 3x3 vertical sobel kernel
 */
export const SOBEL_Y = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1],
];
