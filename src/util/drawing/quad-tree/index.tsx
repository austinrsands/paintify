import QuadTree from '../../../lib/structures/quad-tree';
import Vector2 from '../../../lib/structures/vector2';
import { drawLineSegment } from '../line';

/**
 * Draws the subdivision lines of a quad tree
 *
 * @param context the 2D graphics context to draw on
 * @param quadTree the quad tree whose subdivisions should be drawn
 * @param scale the ratio of the canvas' size to the quad tree's size
 */
const drawSubdivision = (
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
    drawLineSegment(
      context,
      { x: startX * scale.x, y: y * scale.y },
      { x: endX * scale.x, y: y * scale.y },
    );

    // Draw vertical line.
    const startY = quadTree.position.y;
    const endY = quadTree.position.y + quadTree.size.height;
    const x = quadTree.position.x + quadTree.size.width / 2;
    drawLineSegment(
      context,
      { x: x * scale.x, y: startY * scale.y },
      { x: x * scale.x, y: endY * scale.y },
    );

    // Repeat recursively
    if (quadTree.neighbors.topLeft)
      drawSubdivision(context, quadTree.neighbors.topLeft, scale);
    if (quadTree.neighbors.topRight)
      drawSubdivision(context, quadTree.neighbors.topRight, scale);
    if (quadTree.neighbors.bottomLeft)
      drawSubdivision(context, quadTree.neighbors.bottomLeft, scale);
    if (quadTree.neighbors.bottomRight)
      drawSubdivision(context, quadTree.neighbors.bottomRight, scale);
  }
};

/**
 * Draws a quad tree representation out of line segments
 *
 * @param context the 2D graphics context to draw on
 * @param quadTree the quad tree to draw
 */
export const drawQuadTree = (
  context: CanvasRenderingContext2D,
  quadTree: QuadTree,
) => {
  // Determine ratio of canvas size to root quadtree size
  const scale: Vector2 = {
    x: context.canvas.width / quadTree.size.width,
    y: context.canvas.height / quadTree.size.height,
  };
  drawSubdivision(context, quadTree, scale);
};
