import QuadTree from '../../../lib/structures/quad-tree';
import Vector from '../../../lib/structures/vector';
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
  scale: Vector,
) => {
  if (
    quadTree.subtrees.topLeft ||
    quadTree.subtrees.topRight ||
    quadTree.subtrees.bottomLeft ||
    quadTree.subtrees.bottomRight
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
    if (quadTree.subtrees.topLeft)
      drawSubdivision(context, quadTree.subtrees.topLeft, scale);
    if (quadTree.subtrees.topRight)
      drawSubdivision(context, quadTree.subtrees.topRight, scale);
    if (quadTree.subtrees.bottomLeft)
      drawSubdivision(context, quadTree.subtrees.bottomLeft, scale);
    if (quadTree.subtrees.bottomRight)
      drawSubdivision(context, quadTree.subtrees.bottomRight, scale);
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
  const scale: Vector = {
    x: context.canvas.width / quadTree.size.width,
    y: context.canvas.height / quadTree.size.height,
  };
  drawSubdivision(context, quadTree, scale);
};
