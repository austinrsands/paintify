import InclusiveRange from '../../lib/structures/inclusive-range';
import Vector2 from '../../lib/structures/vector2';

/**
 * Returns the interpolated value of a point on a bezier curve
 *
 * @param start the starting point of the bezier curve
 * @param control the control point of the bezier curve
 * @param end the ending point of the bezier curve
 * @param time the interpolation value in the range [0, 1]
 * @returns the point on the described bezier curve at the given time
 */
export const bezierPoint = (
  start: number,
  control: number,
  end: number,
  time: number,
): number =>
  control + (1 - time) ** 2 * (start - control) + time ** 2 * (end - control);

/**
 * Returns the slope of a line tangent to a bezier curve
 *
 * @param start the starting point of the bezier curve
 * @param control the control point of the bezier curve
 * @param end the ending point of the bezier curve
 * @param time the interpolation value in the range [0, 1]
 * @returns the slope of the line tangent to the described bezier curve at the given time
 */
export const bezierTangent = (
  start: number,
  control: number,
  end: number,
  time: number,
): number => 2 * (1 - time) * (control - start) + 2 * time * (end - control);

/**
 * Returns whether the difference between two numbers is less than some amount
 *
 * @param a the first number
 * @param b the second number
 * @param epsilon the minimum difference for which the numbers will be considered unequal
 * @returns whether the difference between a and b is less than epsilon
 */
export const almostEqual = (a: number, b: number, epsilon: number = 0.0001) =>
  Math.abs(a - b) < epsilon;

/**
 * Returns whether three points fall on the same line
 *
 * @param a the first point
 * @param b the second point
 * @param c the third point
 * @returns whether a, b, and c fall on the same line
 */
export const colinear = (a: Vector2, b: Vector2, c: Vector2) =>
  almostEqual(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y), 0);

/**
 * Clamps a number in an inclusive range.
 *
 * @param num the number to clamp
 * @param range the range in which to clamp the number
 * @returns the given number clamped to the given range
 */
export const clamp = (num: number, range: InclusiveRange) =>
  Math.min(Math.max(num, range.min), range.max);

/**
 * Returns the standard deviation of the given array
 *
 * @param nums an array of numbers
 * @returns the standard deviation of the given array
 */
export const standardDeviation = (nums: number[]) => {
  const mean = nums.reduce((a, b) => a + b) / nums.length;
  return Math.sqrt(
    nums.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / nums.length,
  );
};

/**
 * Returns the average of the numbers in given array
 *
 * @param nums an array of numbers
 * @returns the standard deviation of the array
 */
export const average = (nums: number[]) =>
  nums.reduce((a: number, b: number) => a + b) / nums.length;

/**
 * Returns the greates common positive divisor between two numbers
 *
 * @param a the first number
 * @param b the second number
 * @returns the greatest common positive divisor between a and b
 */
export const greatestCommonDivisor = (a: number, b: number): number =>
  b ? greatestCommonDivisor(b, a % b) : Math.abs(a);

/**
 * Returns whether the given number is even
 *
 * @param num a number
 * @returns whether a is even
 */
export const isEven = (num: number) => num % 2 === 0;

/**
 * Returns whether the given number is odd
 *
 * @param num a number
 * @returns whether a is odd
 */
export const isOdd = (num: number) => !isEven(num);

/**
 * Returns a random alphanumeric string
 *
 * @returns a random seed
 */
export const randomSeed = (): string =>
  Math.random().toString(36).slice(2).toUpperCase();
