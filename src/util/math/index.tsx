import InclusiveRange from '../../lib/structures/inclusive-range';
import Vector2 from '../../lib/structures/vector2';

// Returns the point on the given quadratic bezier at time between 0 and 1
export const bezierPoint = (
  start: number,
  control: number,
  end: number,
  time: number,
): number =>
  control + (1 - time) ** 2 * (start - control) + time ** 2 * (end - control);

// Returns the derivative of the given quadratic bezier at time between 0 and 1
export const bezierTangent = (
  start: number,
  control: number,
  end: number,
  time: number,
): number => 2 * (1 - time) * (control - start) + 2 * time * (end - control);

export const almostEqual = (a: number, b: number, epsilon: number = 0.0001) =>
  Math.abs(a - b) < epsilon;

export const colinear = (a: Vector2, b: Vector2, c: Vector2) =>
  almostEqual(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y), 0);

// Clamps a number in an inclusive range.
export const clamp = (value: number, range: InclusiveRange) =>
  Math.min(Math.max(value, range.min), range.max);

// Returns the standard deviation of the given array
export const standardDeviation = (nums: number[]) => {
  const mean = nums.reduce((a, b) => a + b) / nums.length;
  return Math.sqrt(
    nums.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) / nums.length,
  );
};
