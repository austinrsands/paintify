import Brush from '../../structures/brush';
import Color from '../../structures/color';
import Vector from '../../structures/vector';
import { brightness } from '../../image-processing/pixels';
import { colinear } from '../../math';
import { drawBristle } from '../bristle';

/**
 * Paints a brush stroke on a canvas
 *
 * @param context the 2D graphics context to draw on
 * @param brush the brush to paint with
 * @param position the position of the stroke
 * @param rotation the direction of the stroke in radians
 * @param paintColor the base color of the paint
 * @param length the length of the stroke
 * @param taper the amount to taper the stroke over time in the range [0, 1]
 * @param lift the amount to lift the brush over time in the range [0, 1]
 * @param segmentLength the length of the line segments that make up each curved bristle
 */
export const paintStroke = (
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  brush: Brush,
  position: Vector,
  rotation: number,
  paintColor: Color,
  length: number,
  taper: number,
  lift: number,
  segmentLength: number,
) => {
  // Used to calculate start and end points
  const actualLength = length - brush.size.width;
  const oppositeLength = (actualLength / 2) * Math.sin(rotation);
  const adjacentLength = (actualLength / 2) * Math.cos(rotation);

  // Determine points for bezier curve
  const start: Vector = {
    x: position.x - adjacentLength,
    y: position.y + oppositeLength,
  };
  const end: Vector = {
    x: position.x + adjacentLength,
    y: position.y - oppositeLength,
  };

  // TODO: implement curved strokes
  const control: Vector = {
    x: position.x,
    y: position.y,
  };

  // Used to optimize drawing
  const strokeIsStraight = colinear(start, end, control);

  brush.bristleData.forEach((bristleDatum) => {
    // Determine how long bristle stays on canvas
    const taperAmount =
      taper * Math.abs(bristleDatum.offset.y / (brush.size.height / 2));

    const liftAmount =
      lift *
      ((brush.size.width - (bristleDatum.offset.x + brush.size.width / 2)) /
        brush.size.width);
    const lifetime = 1 - Math.max(taperAmount, liftAmount);
    const pathLength = lifetime * actualLength;

    // Use a single segment when path is straight to improve performance
    const numSegments = strokeIsStraight
      ? 1
      : Math.max(Math.round(pathLength / segmentLength), 1);

    // Determine shifted color
    const baseColorBrightness = brightness(paintColor);
    const availableBrightness =
      bristleDatum.paintShift > 0
        ? 255 - baseColorBrightness
        : baseColorBrightness;
    const channelOffset = bristleDatum.paintShift * availableBrightness;
    const color: Color = {
      red: paintColor.red + channelOffset,
      green: paintColor.green + channelOffset,
      blue: paintColor.blue + channelOffset,
      alpha: paintColor.alpha,
    };

    drawBristle(
      context,
      brush.bristleRadius,
      bristleDatum.offset,
      color,
      start,
      control,
      end,
      lifetime,
      numSegments,
    );
  });
};
