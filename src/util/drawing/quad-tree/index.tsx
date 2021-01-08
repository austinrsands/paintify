import QuadTree from '../../../lib/structures/quad-tree';
import Vector2 from '../../../lib/structures/vector2';
import { drawLine } from '../line';

const drawIntersection = (
  context: CanvasRenderingContext2D,
  quadTree: QuadTree,
  scale: Vector2,
) => {
  if (
    quadTree.neighbors.topLeft ||
    quadTree.neighbors.topRight ||
    quadTree.neighbors.bottomLeft ||
    quadTree.neighbors.bottomRight
  ) {
    // Draw horizontal line.
    const startX = quadTree.position.x;
    const endX = quadTree.position.x + quadTree.size.width;
    const y = quadTree.position.y + quadTree.size.height / 2;
    drawLine(
      context,
      { x: startX * scale.x, y: y * scale.y },
      { x: endX * scale.x, y: y * scale.y },
    );

    // Draw vertical line.
    const startY = quadTree.position.y;
    const endY = quadTree.position.y + quadTree.size.height;
    const x = quadTree.position.x + quadTree.size.width / 2;
    drawLine(
      context,
      { x: x * scale.x, y: startY * scale.y },
      { x: x * scale.x, y: endY * scale.y },
    );

    // Repeat recursively
    if (quadTree.neighbors.topLeft)
      drawIntersection(context, quadTree.neighbors.topLeft, scale);
    if (quadTree.neighbors.topRight)
      drawIntersection(context, quadTree.neighbors.topRight, scale);
    if (quadTree.neighbors.bottomLeft)
      drawIntersection(context, quadTree.neighbors.bottomLeft, scale);
    if (quadTree.neighbors.bottomRight)
      drawIntersection(context, quadTree.neighbors.bottomRight, scale);
  }
};

export const drawQuadTree = (
  context: CanvasRenderingContext2D,
  quadTree: QuadTree,
) => {
  // Determine ratio of canvas size to root quadtree size
  const scale: Vector2 = {
    x: context.canvas.width / quadTree.size.width,
    y: context.canvas.height / quadTree.size.height,
  };
  drawIntersection(context, quadTree, scale);
};
