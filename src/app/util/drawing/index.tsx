import Brush, { BRISTLE_THICKNESS } from '../../../lib/structures/brush';
import Color from '../../../lib/structures/color';
import Vector2 from '../../../lib/structures/vector2';
import QuadTree from '../../../lib/structures/quad-tree';
import Size from '../../../lib/structures/size';

// Returns the point on the given quadratic bezier at time between 0 and 1
const bezierPoint = (
  start: number,
  control: number,
  end: number,
  time: number,
): number =>
  control + (1 - time) ** 2 * (start - control) + time ** 2 * (end - control);

// Returns the derivative of the given quadratic bezier at time between 0 and 1
const bezierTangent = (
  start: number,
  control: number,
  end: number,
  time: number,
): number => 2 * (1 - time) * (control - start) + 2 * time * (end - control);

// Clamps a number in an inclusive range.
// const clamp = (value: number, range: InclusiveRange) =>
//   Math.min(Math.max(value, range.min), range.max);

export const fillBackground = (
  context: CanvasRenderingContext2D,
  fillStyle: string = '#FFFFFF',
) => {
  context.fillStyle = fillStyle;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2,
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};

export const fillEllipse = (
  context: CanvasRenderingContext2D,
  position: Vector2,
  size: Size,
  rotation: number = 0,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  antiClockwise?: boolean,
) => {
  context.beginPath();
  context.ellipse(
    position.x,
    position.y,
    size.width / 2,
    size.height / 2,
    rotation,
    startAngle,
    endAngle,
    antiClockwise,
  );
  context.fill();
};

export const drawQuadTree = (
  context: CanvasRenderingContext2D,
  quadTree: QuadTree,
  lineWidth: number = 4,
) => {
  // Configure line width
  context.lineWidth = lineWidth;

  const drawIntersection = (tree: QuadTree) => {
    if (
      tree.neighbors.topLeft ||
      tree.neighbors.topRight ||
      tree.neighbors.bottomLeft ||
      tree.neighbors.bottomRight
    ) {
      // Draw horizontal line.
      const startX = tree.position.x;
      const endX = tree.position.x + tree.size.width;
      const y = tree.position.y + tree.size.height / 2;
      drawLine(context, { x: startX, y }, { x: endX, y });

      // Draw vertical line.
      const startY = tree.position.y;
      const endY = tree.position.y + tree.size.height;
      const x = tree.position.x + tree.size.width / 2;
      drawLine(context, { x, y: startY }, { x, y: endY });

      // Repeat recursively
      if (tree.neighbors.topLeft) drawIntersection(tree.neighbors.topLeft);
      if (tree.neighbors.topRight) drawIntersection(tree.neighbors.topRight);
      if (tree.neighbors.bottomLeft)
        drawIntersection(tree.neighbors.bottomLeft);
      if (tree.neighbors.bottomRight)
        drawIntersection(tree.neighbors.bottomRight);
    }
  };
  drawIntersection(quadTree);
};

export const paintStamp = (
  context: CanvasRenderingContext2D,
  brush: Brush,
  position: Vector2,
  color: Color,
) => {
  context.fillStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${brush.alpha})`;
  brush.bristleOffsets.forEach((offset) => {
    const bristlePosition: Vector2 = {
      x: position.x + offset.x - BRISTLE_THICKNESS / 2,
      y: position.y + offset.y - BRISTLE_THICKNESS / 2,
    };
    const bristleSize: Size = {
      width: BRISTLE_THICKNESS,
      height: BRISTLE_THICKNESS,
    };
    fillEllipse(context, bristlePosition, bristleSize);
  });
};

const TIME_STEP = 0.1;
export const paintStroke = (
  context: CanvasRenderingContext2D,
  brush: Brush,
  position: Vector2,
  color: Color,
  length: number,
  rotation: number = 0,
) => {
  // Configure context
  context.strokeStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${brush.alpha})`;
  context.lineWidth = BRISTLE_THICKNESS;
  context.lineCap = 'round';

  // Used to calculate start and end points
  const oppositeLength = (length / 2) * Math.sin(rotation);
  const adjacentLength = (length / 2) * Math.cos(rotation);

  const start: Vector2 = {
    x: position.x - adjacentLength,
    y: position.y + oppositeLength,
  };

  const end: Vector2 = {
    x: position.x + adjacentLength,
    y: position.y - oppositeLength,
  };

  // Used for curving the stroke
  const control: Vector2 = {
    x: position.x - length / 4,
    y: position.y - length / 4,
  };

  brush.bristleOffsets.forEach((offset) => {
    context.beginPath();
    for (let time = 0; time < 1; time += TIME_STEP) {
      const currentBrushPosition: Vector2 = {
        x: bezierPoint(start.x, control.x, end.x, time),
        y: bezierPoint(start.y, control.y, end.y, time),
      };
      const currentTangent: Vector2 = {
        x: bezierTangent(start.x, control.x, end.x, time),
        y: bezierTangent(start.y, control.y, end.y, time),
      };
      const currentRotation = Math.atan2(currentTangent.y, currentTangent.x);

      const currentBristlePosition: Vector2 = {
        x:
          currentBrushPosition.x +
          Math.cos(currentRotation) * offset.x -
          Math.sin(currentRotation) * offset.y,
        y:
          currentBrushPosition.y +
          Math.sin(currentRotation) * offset.x +
          Math.cos(currentRotation) * offset.y,
      };

      if (time !== 0) {
        context.lineTo(currentBristlePosition.x, currentBristlePosition.y);
        context.stroke();
      }
      context.moveTo(currentBristlePosition.x, currentBristlePosition.y);
    }
  });
};
