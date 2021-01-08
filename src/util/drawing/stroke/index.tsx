import Brush from '../../../lib/structures/brush';
import Color from '../../../lib/structures/color';
import StrokeOptions from '../../../lib/structures/stroke-options';
import Vector2 from '../../../lib/structures/vector2';
import { brightness } from '../../image-processing/pixels';
import { colinear } from '../../math';
import { drawBristle } from '../bristle';

export const paintStroke = (
  context: CanvasRenderingContext2D,
  brush: Brush,
  options: StrokeOptions,
  position: Vector2,
  rotation: number = 0,
) => {
  // Used to calculate start and end points
  const actualLength = options.length - brush.size.width;
  const oppositeLength = (actualLength / 2) * Math.sin(rotation);
  const adjacentLength = (actualLength / 2) * Math.cos(rotation);

  // Determine points for bezier curve
  const start: Vector2 = {
    x: position.x - adjacentLength,
    y: position.y + oppositeLength,
  };
  const end: Vector2 = {
    x: position.x + adjacentLength,
    y: position.y - oppositeLength,
  };

  // TODO: implement curved strokes
  const control: Vector2 = {
    x: position.x,
    y: position.y,
  };

  // Used to optimize drawing
  const strokeIsStraight = colinear(start, end, control);

  brush.bristles.forEach((bristle) => {
    // Determine how long bristle stays on canvas
    const taperAmount =
      options.taper * Math.abs(bristle.offset.y / (brush.size.height / 2));
    const liftAmount =
      options.lift *
      ((brush.size.width - (bristle.offset.x + brush.size.width / 2)) /
        brush.size.width);
    const lifetime = 1 - Math.max(taperAmount, liftAmount);
    const pathLength = lifetime * actualLength;

    // Use a single segment when path is straight to improve performance
    const numSegments = strokeIsStraight
      ? 1
      : Math.max(Math.round(pathLength / options.segmentLength), 1);
    const timeStep = lifetime / numSegments;

    // Determine shifted color
    const baseColorBrightness = brightness(options.baseColor);
    const availableBrightness =
      bristle.shift > 0 ? 255 - baseColorBrightness : baseColorBrightness;
    const channelOffset = bristle.shift * availableBrightness;
    const color: Color = {
      red: options.baseColor.red + channelOffset,
      green: options.baseColor.green + channelOffset,
      blue: options.baseColor.blue + channelOffset,
      alpha: options.baseColor.alpha,
    };

    drawBristle(
      context,
      bristle,
      color,
      start,
      control,
      end,
      lifetime,
      timeStep,
    );
  });
};
