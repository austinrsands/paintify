import Position from '../position';
import QuadTree from '../quad-tree';

export const drawLine = (
  context: CanvasRenderingContext2D,
  start: Position,
  end: Position,
) => {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};

export const drawQuadTree = (
  context: CanvasRenderingContext2D,
  quadTree: QuadTree,
  fillStyle: string = '#FFFFFF',
  lineWidth: number = 4,
) => {
  // Paint background.
  context.fillStyle = fillStyle;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

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
