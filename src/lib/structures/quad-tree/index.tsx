import Vector from '../vector';
import Size from '../size';
import Rect from '../rect';

/**
 * Represents the subtrees of a quad tree
 */
interface Subtrees {
  topLeft?: QuadTree;
  topRight?: QuadTree;
  bottomLeft?: QuadTree;
  bottomRight?: QuadTree;
}

/**
 * Represents a quad tree
 */
class QuadTree {
  readonly rect: Rect;
  readonly subtrees: Subtrees;

  /**
   * Constructs a quad tree
   *
   * @param position the top left point of the quad tree
   * @param size the dimensions of the quad tree
   * @returns a new quad tree instance
   */
  constructor(position: Vector, size: Size) {
    this.rect = { position, size };
    this.subtrees = {};
  }

  /**
   * Divides a quad tree into its four quadrants
   */
  public subdivide() {
    const halfSize: Size = {
      width: this.rect.size.width / 2,
      height: this.rect.size.height / 2,
    };

    // Determing neighboring origins
    const topLeftPoint: Vector = this.rect.position;
    const topMiddlePoint: Vector = {
      x: this.rect.position.x + halfSize.width,
      y: this.rect.position.y,
    };
    const middleLeftPoint: Vector = {
      x: this.rect.position.x,
      y: this.rect.position.y + halfSize.height,
    };
    const centerPoint: Vector = {
      x: this.rect.position.x + halfSize.width,
      y: this.rect.position.y + halfSize.height,
    };

    // Create neighboring trees
    this.subtrees.topLeft = new QuadTree(topLeftPoint, halfSize);
    this.subtrees.topRight = new QuadTree(topMiddlePoint, halfSize);
    this.subtrees.bottomLeft = new QuadTree(middleLeftPoint, halfSize);
    this.subtrees.bottomRight = new QuadTree(centerPoint, halfSize);
  }

  /**
   * Returns whether this tree contains a point
   *
   * @param point the point to look for
   * @returns whether this tree contains the given point
   */
  public contains(point: Vector): boolean {
    return (
      point.x >= this.rect.position.x &&
      point.x <= this.rect.position.x + this.rect.size.width &&
      point.y >= this.rect.position.y &&
      point.y <= this.rect.position.y + this.rect.size.height
    );
  }

  /**
   * Returns this tree's smallest subtree containting a point
   *
   * @param point the point to look for
   * @returns this tree's smallest subtree containting the given point
   */
  public smallestBoundingSubtree(point: Vector): QuadTree | undefined {
    if (this.subtrees.topLeft?.contains(point))
      return this.subtrees.topLeft.smallestBoundingSubtree(point);

    if (this.subtrees.topRight?.contains(point))
      return this.subtrees.topRight.smallestBoundingSubtree(point);

    if (this.subtrees.bottomLeft?.contains(point))
      return this.subtrees.bottomLeft.smallestBoundingSubtree(point);

    if (this.subtrees.bottomRight?.contains(point))
      return this.subtrees.bottomRight.smallestBoundingSubtree(point);

    return this.contains(point) ? this : undefined;
  }
}

export default QuadTree;
