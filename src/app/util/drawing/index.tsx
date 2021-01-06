import Brush from '../../../lib/structures/brush';
import Color from '../../../lib/structures/color';
import Vector2 from '../../../lib/structures/vector2';
import QuadTree from '../../../lib/structures/quad-tree';
import { bezierPoint, bezierTangent, colinear } from '../math';

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
  radii: Vector2,
  rotation: number = 0,
  startAngle: number = 0,
  endAngle: number = Math.PI * 2,
  antiClockwise?: boolean,
) => {
  context.beginPath();
  context.ellipse(
    position.x,
    position.y,
    radii.x,
    radii.y,
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
  lineWidth: number = 1,
) => {
  const scale: Vector2 = {
    x: context.canvas.width / quadTree.size.width,
    y: context.canvas.height / quadTree.size.height,
  };

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
      drawLine(
        context,
        { x: startX * scale.x, y: y * scale.y },
        { x: endX * scale.x, y: y * scale.y },
      );

      // Draw vertical line.
      const startY = tree.position.y;
      const endY = tree.position.y + tree.size.height;
      const x = tree.position.x + tree.size.width / 2;
      drawLine(
        context,
        { x: x * scale.x, y: startY * scale.y },
        { x: x * scale.x, y: endY * scale.y },
      );

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
      x: position.x + offset.x,
      y: position.y + offset.y,
    };
    const bristleRadii: Vector2 = {
      x: brush.bristleRadius,
      y: brush.bristleRadius,
    };
    fillEllipse(context, bristlePosition, bristleRadii);
  });
};

const drawBristle = (
  context: CanvasRenderingContext2D,
  offset: Vector2,
  radius: number,
  color: Color,
  alpha: number,
  start: Vector2,
  control: Vector2,
  end: Vector2,
  lifetime: number,
  timestep: number,
) => {
  // Prevent infinite loops
  if (timestep <= 0 || lifetime <= 0) return;

  // Configure context
  context.strokeStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
  context.lineWidth = radius * 2;
  context.lineCap = 'round';

  context.beginPath();
  for (let time = 0; time <= lifetime; time += timestep) {
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
};

export const paintStroke = (
  context: CanvasRenderingContext2D,
  brush: Brush,
  position: Vector2,
  color: Color,
  length: number,
  taper: number = 0,
  rotation: number = 0,
  segmentLength: number = 25,
) => {
  // Used to calculate start and end points
  const actualLength = length - brush.size.width;
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
  const control: Vector2 = {
    x: position.x,
    y: position.y,
  };

  // Used to optimize drawing
  const strokeIsStraight = colinear(start, end, control);

  brush.bristleOffsets.forEach((offset) => {
    // Determine how long bristle stays on canvas
    const lifetime = 1 - taper * Math.abs(offset.y / (brush.size.height / 2));
    const pathLength = lifetime * actualLength;

    // Use a single segment when path is straight to improve performance
    const numSegments = strokeIsStraight
      ? 1
      : Math.max(Math.round(pathLength / segmentLength), 1);
    const timeStep = lifetime / numSegments;

    drawBristle(
      context,
      offset,
      brush.bristleRadius,
      color,
      brush.alpha,
      start,
      control,
      end,
      lifetime,
      timeStep,
    );
  });
};
